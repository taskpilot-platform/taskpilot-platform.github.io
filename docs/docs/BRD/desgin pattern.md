# Design Patterns in TMS Project

## Overview

This document identifies and explains the design patterns used in the Tourist Management System (TMS) project across both Backend (Spring Boot/Java) and Frontend (React/JavaScript).

---

## Backend Design Patterns

### 1. Repository Pattern

**Category:** Data Access Pattern

**Description:** Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.

**Implementation:**

| Interface               | Location                                                                          |
| ----------------------- | --------------------------------------------------------------------------------- |
| `UserRepository`        | `tms-backend/src/main/java/com/example/tms/repository/UserRepository.java`        |
| `TripRepository`        | `tms-backend/src/main/java/com/example/tms/repository/TripRepository.java`        |
| `TourBookingRepository` | `tms-backend/src/main/java/com/example/tms/repository/TourBookingRepository.java` |
| `RouteRepository`       | `tms-backend/src/main/java/com/example/tms/repository/RouteRepository.java`       |

**Code Example:**

```java
// UserRepository.java
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.deletedAt = 0")
    Optional<User> findByUsername(@Param("username") String username);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email AND u.deletedAt = 0")
    boolean existsByEmail(@Param("email") String email);
}
```

**Benefits:**

- Decouples business logic from data access logic
- Enables easy unit testing with mock repositories
- Provides a clean API for data operations

---

### 2. Service Layer Pattern (Facade Pattern)

**Category:** Structural Pattern

**Description:** Defines an application's boundary with a layer of services that establishes a set of available operations and coordinates the application's response to each operation.

**Implementation:**

| Interface        | Implementation       | Location                                             |
| ---------------- | -------------------- | ---------------------------------------------------- |
| `UserService`    | `UserServiceImpl`    | `tms-backend/src/main/java/com/example/tms/service/` |
| `TripService`    | `TripServiceImpl`    | `tms-backend/src/main/java/com/example/tms/service/` |
| `BookingService` | `BookingServiceImpl` | `tms-backend/src/main/java/com/example/tms/service/` |
| `CartService`    | `CartServiceImpl`    | `tms-backend/src/main/java/com/example/tms/service/` |

**Code Example:**

```java
// UserService.java (Interface)
public interface UserService {
    UserResponse createUser(CreateUserRequest request);
    UserResponse getUserById(UUID id);
    PaginationResponse<UserResponse> getAllUsers(UserFilterRequest filter);
    UserResponse updateUser(UUID id, UpdateUserRequest request);
    void deleteUser(UUID id);
}

// UserServiceImpl.java (Implementation)
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        // Business logic implementation
    }
}
```

**Benefits:**

- Separates business logic from controllers
- Promotes code reusability
- Enables transaction management at service level

---

### 3. Dependency Injection (IoC Pattern)

**Category:** Creational Pattern

**Description:** A technique where objects receive their dependencies from external sources rather than creating them internally.

**Implementation:**

| Location               | Usage                                                  |
| ---------------------- | ------------------------------------------------------ |
| `UserController.java`  | `@RequiredArgsConstructor` with `final UserService`    |
| `UserServiceImpl.java` | `@RequiredArgsConstructor` with `final UserRepository` |
| `SecurityConfig.java`  | Constructor injection for filters                      |

**Code Example:**

```java
// UserController.java
@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService; // Injected by Spring

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", response));
    }
}
```

**Benefits:**

- Loose coupling between components
- Easier unit testing with mock dependencies
- Managed lifecycle by Spring container

---

### 4. Builder Pattern

**Category:** Creational Pattern

**Description:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

**Implementation:**

| Class                   | Location                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `BookingDetailResponse` | `tms-backend/src/main/java/com/example/tms/dto/response/booking/BookingDetailResponse.java` |
| `TourCardResponse`      | `tms-backend/src/main/java/com/example/tms/dto/response/customer/TourCardResponse.java`     |
| `StaffDetailResponse`   | `tms-backend/src/main/java/com/example/tms/dto/response/staff/StaffDetailResponse.java`     |
| `PaymentLinkResponse`   | `tms-backend/src/main/java/com/example/tms/dto/response/payment/PaymentLinkResponse.java`   |

**Code Example:**

```java
// BookingDetailResponse.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailResponse {
    private UUID id;
    private UUID tripId;
    private String routeName;
    private LocalDate departureDate;
    private BigDecimal totalPrice;
    private List<TravelerResponse> travelers;
    private InvoiceResponse invoice;
}

// Usage
BookingDetailResponse response = BookingDetailResponse.builder()
    .id(booking.getId())
    .tripId(trip.getId())
    .routeName(route.getName())
    .departureDate(trip.getDepartureDate())
    .totalPrice(booking.getTotalPrice())
    .build();
```

**Benefits:**

- Clean and readable object creation
- Immutable objects support
- Optional parameters handling

---

### 5. Template Method Pattern (Inheritance)

**Category:** Behavioral Pattern

**Description:** Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.

**Implementation:**

| Base Class           | Location                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| `AbstractBaseEntity` | `tms-backend/src/main/java/com/example/tms/entity/AbstractBaseEntity.java` |

**Code Example:**

```java
// AbstractBaseEntity.java
@Getter
@Setter
@MappedSuperclass
public abstract class AbstractBaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", nullable = false)
    private Long deletedAt = 0L;

    @Version
    private Long version;

    public boolean isDeleted() {
        return deletedAt != null && deletedAt > 0;
    }

    public void markAsDeleted() {
        this.deletedAt = System.currentTimeMillis();
    }
}

// User.java extends AbstractBaseEntity
@Entity
public class User extends AbstractBaseEntity {
    private String username;
    private String email;
    // ... other fields
}
```

**Benefits:**

- Code reuse for common entity fields (id, timestamps, soft delete)
- Consistent behavior across all entities
- Centralized audit trail management

---

### 6. Filter/Chain of Responsibility Pattern

**Category:** Behavioral Pattern

**Description:** Passes requests along a chain of handlers. Each handler decides either to process the request or pass it to the next handler.

**Implementation:**

| Filter                    | Location                                                                          |
| ------------------------- | --------------------------------------------------------------------------------- |
| `JwtAuthenticationFilter` | `tms-backend/src/main/java/com/example/tms/security/JwtAuthenticationFilter.java` |
| `JwtBlackListFilter`      | `tms-backend/src/main/java/com/example/tms/security/JwtBlackListFilter.java`      |

**Code Example:**

```java
// JwtAuthenticationFilter.java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Pass to next filter
            return;
        }
        // Process JWT authentication
        filterChain.doFilter(request, response);
    }
}

// SecurityConfig.java - Chain configuration
http.addFilterBefore(jwtBlackListFilter, UsernamePasswordAuthenticationFilter.class)
    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
```

**Benefits:**

- Modular security processing
- Easy to add/remove filters
- Separation of authentication concerns

---

### 7. DTO Pattern (Data Transfer Object)

**Category:** Structural Pattern

**Description:** An object that carries data between processes to reduce the number of method calls.

**Implementation:**

| Category      | Examples                                                      | Location                                                  |
| ------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| Request DTOs  | `CreateUserRequest`, `UpdateUserRequest`, `UserFilterRequest` | `tms-backend/src/main/java/com/example/tms/dto/request/`  |
| Response DTOs | `UserResponse`, `ApiResponse<T>`, `PaginationResponse<T>`     | `tms-backend/src/main/java/com/example/tms/dto/response/` |

**Code Example:**

```java
// ApiResponse.java - Generic wrapper DTO
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
```

**Benefits:**

- Decouples API contract from internal models
- Controls data exposure
- Enables API versioning

---

### 8. Singleton Pattern

**Category:** Creational Pattern

**Description:** Ensures a class has only one instance and provides a global point of access to it.

**Implementation:**

| Bean                    | Location                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| `Cloudinary`            | `tms-backend/src/main/java/com/example/tms/config/CloudinaryConfig.java` |
| `PasswordEncoder`       | `tms-backend/src/main/java/com/example/tms/security/SecurityConfig.java` |
| `AuthenticationManager` | `tms-backend/src/main/java/com/example/tms/security/SecurityConfig.java` |

**Code Example:**

```java
// CloudinaryConfig.java
@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config); // Single instance managed by Spring
    }
}

// SecurityConfig.java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12); // Single instance
}
```

**Benefits:**

- Resource efficiency
- Consistent configuration
- Controlled access to shared resources

---

### 9. Strategy Pattern (via Specification)

**Category:** Behavioral Pattern

**Description:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

**Implementation:**

| Repository              | Feature                                 |
| ----------------------- | --------------------------------------- |
| `UserRepository`        | `JpaSpecificationExecutor<User>`        |
| `TripRepository`        | `JpaSpecificationExecutor<Trip>`        |
| `TourBookingRepository` | `JpaSpecificationExecutor<TourBooking>` |

**Code Example:**

```java
// Dynamic query building with Specifications
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
    // JpaSpecificationExecutor allows dynamic query building
}

// Usage in service
Specification<User> spec = Specification.where(null);
if (filter.getRole() != null) {
    spec = spec.and((root, query, cb) -> cb.equal(root.get("role"), filter.getRole()));
}
if (filter.getSearch() != null) {
    spec = spec.and((root, query, cb) ->
        cb.like(root.get("fullName"), "%" + filter.getSearch() + "%"));
}
Page<User> users = userRepository.findAll(spec, pageable);
```

**Benefits:**

- Flexible query building
- Runtime algorithm selection
- Open/Closed principle compliance

---

## Frontend Design Patterns

### 10. Provider Pattern (React Context)

**Category:** Behavioral Pattern

**Description:** Provides a way to pass data through the component tree without passing props manually at every level.

**Implementation:**

| Provider            | Location                                                           |
| ------------------- | ------------------------------------------------------------------ |
| `AuthProvider`      | `tms-frontend/src/contexts/AuthContextProvider.jsx`                |
| `QueryProvider`     | `tms-frontend/src/contexts/QueryProvider.jsx`                      |
| `AdminTitleContext` | `tms-frontend/src/layouts/adminLayout/AdminLayout/AdminLayout.jsx` |

**Code Example:**

```jsx
// AuthContext.jsx
export const AuthContext = createContext(null);

// AuthContextProvider.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (username, password) => {
    const response = await authService.login(username, password);
    setIsAuthenticated(true);
    setUser(authService.getCurrentUser());
    return response;
  }, []);

  const value = { user, login, logout, isAuthenticated, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Usage with custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

**Benefits:**

- Avoids prop drilling
- Centralized state management
- Clean component hierarchy

---

### 11. Custom Hook Pattern

**Category:** Behavioral Pattern

**Description:** Extracts component logic into reusable functions.

**Implementation:**

| Hook              | Location                                    |
| ----------------- | ------------------------------------------- |
| `useAuth`         | `tms-frontend/src/hooks/useAuth.js`         |
| `useTravelsQuery` | `tms-frontend/src/hooks/useTravelsQuery.js` |
| `useTravels`      | `tms-frontend/src/hooks/useTravels.js`      |

**Code Example:**

```javascript
// useTravelsQuery.js
export const useTravelsQuery = (filters = {}) => {
  return useQuery({
    queryKey: ["travels", filters],
    queryFn: () => travelService.getAllTravels(filters),
  });
};

export const useCreateTravel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (travelData) => travelService.createTravel(travelData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
    },
  });
};

// Usage in component
const { data, isLoading, error } = useTravelsQuery({ status: "ACTIVE" });
const createMutation = useCreateTravel();
```

**Benefits:**

- Code reusability
- Separation of concerns
- Easier testing

---

### 12. Module Pattern (Service Layer)

**Category:** Structural Pattern

**Description:** Encapsulates related functions and variables into a single unit.

**Implementation:**

| Service          | Location                                      |
| ---------------- | --------------------------------------------- |
| `authService`    | `tms-frontend/src/services/authService.js`    |
| `travelService`  | `tms-frontend/src/services/travelService.js`  |
| `bookingService` | `tms-frontend/src/services/bookingService.js` |
| `userService`    | `tms-frontend/src/services/userService.js`    |

**Code Example:**

```javascript
// authService.js
const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    const { token, refreshToken } = response.data.data;
    sessionStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
    return response.data;
  },

  logout: async () => {
    sessionStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    sessionStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  },

  getToken: () => sessionStorage.getItem(AUTH_CONFIG.TOKEN_KEY),

  isAuthenticated: () => !!authService.getToken(),
};

export default authService;
```

**Benefits:**

- Encapsulation of API logic
- Single responsibility
- Easy to mock for testing

---

### 13. Interceptor Pattern (Axios)

**Category:** Behavioral Pattern

**Description:** Intercepts requests/responses to add common processing logic.

**Implementation:**

| File             | Location                              |
| ---------------- | ------------------------------------- |
| `api.js`         | `tms-frontend/src/services/api.js`    |
| `httpHandler.js` | `tms-frontend/src/lib/httpHandler.js` |

**Code Example:**

```javascript
// api.js
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Request interceptor - Add token to all requests
api.interceptors.request.use((config) => {
  const accessToken = authService.getToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Refresh token logic
      const { token } = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

**Benefits:**

- Centralized request/response handling
- Automatic token management
- Consistent error handling

---

### 14. Higher-Order Component Pattern (HOC) / Render Props

**Category:** Structural Pattern

**Description:** A function that takes a component and returns a new component with enhanced functionality.

**Implementation:**

| Component             | Location                                     |
| --------------------- | -------------------------------------------- |
| `ProtectedRoute`      | `tms-frontend/src/routes/ProtectedRoute.jsx` |
| `PublicRoute`         | `tms-frontend/src/routes/PublicRoute.jsx`    |
| `CustomerAccessGuard` | `tms-frontend/src/routes/router.jsx`         |

**Code Example:**

```jsx
// ProtectedRoute.jsx
const ProtectedRoute = ({ children, allowedRoles = [], fallback }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    const defaultPath =
      fallback || (user?.role === "ADMIN" ? "/dashboard" : "/");
    return <Navigate to={defaultPath} replace />;
  }

  return children;
};

// Usage in router
<ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
  <AdminLayout />
</ProtectedRoute>;
```

**Benefits:**

- Reusable authorization logic
- Separation of concerns
- Declarative routing protection

---

### 15. Composite Pattern (Layout Components)

**Category:** Structural Pattern

**Description:** Composes objects into tree structures to represent part-whole hierarchies.

**Implementation:**

| Layout           | Location                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `AdminLayout`    | `tms-frontend/src/layouts/adminLayout/AdminLayout/AdminLayout.jsx` |
| `CustomerLayout` | `tms-frontend/src/layouts/customerLayout/CustomerLayout/`          |

**Code Example:**

```jsx
// AdminLayout.jsx
export default function AdminLayout() {
  const [title, setTitle] = useState("Dashboard");

  return (
    <AdminTitleContext.Provider value={{ title, setTitle }}>
      <div className="admin-container">
        <Navigation /> {/* Sidebar */}
        <div className="admin-main">
          <AdminHeader /> {/* Header */}
          <main className="admin-content">
            <Outlet /> {/* Page content */}
          </main>
        </div>
      </div>
    </AdminTitleContext.Provider>
  );
}
```

**Benefits:**

- Consistent page structure
- Reusable layout components
- Easy to modify global layout

---

### 16. Singleton Pattern (QueryClient)

**Category:** Creational Pattern

**Description:** Single instance of React Query client shared across the application.

**Implementation:**

| Instance      | Location                                |
| ------------- | --------------------------------------- |
| `queryClient` | `tms-frontend/src/utils/queryClient.js` |

**Code Example:**

```javascript
// queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// QueryProvider.jsx
export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
```

**Benefits:**

- Shared cache across components
- Consistent configuration
- Single source of truth for server state

---

## Summary Table

| #   | Pattern                          | Type        | Backend | Frontend     |
| --- | -------------------------------- | ----------- | ------- | ------------ |
| 1   | Repository                       | Data Access | ✅      | ❌           |
| 2   | Service Layer / Facade           | Structural  | ✅      | ✅           |
| 3   | Dependency Injection             | Creational  | ✅      | ✅ (Context) |
| 4   | Builder                          | Creational  | ✅      | ❌           |
| 5   | Template Method                  | Behavioral  | ✅      | ❌           |
| 6   | Filter / Chain of Responsibility | Behavioral  | ✅      | ❌           |
| 7   | DTO                              | Structural  | ✅      | ❌           |
| 8   | Singleton                        | Creational  | ✅      | ✅           |
| 9   | Strategy (Specification)         | Behavioral  | ✅      | ❌           |
| 10  | Provider (Context)               | Behavioral  | ❌      | ✅           |
| 11  | Custom Hook                      | Behavioral  | ❌      | ✅           |
| 12  | Module                           | Structural  | ❌      | ✅           |
| 13  | Interceptor                      | Behavioral  | ❌      | ✅           |
| 14  | HOC / Guard                      | Structural  | ❌      | ✅           |
| 15  | Composite (Layout)               | Structural  | ❌      | ✅           |
| 16  | Observer (React Query)           | Behavioral  | ❌      | ✅           |

---

## Architecture Patterns

### MVC / Layered Architecture (Backend)

```
┌─────────────────────────────────────────────────────────────┐
│                     Controller Layer                         │
│  (UserController, TripController, BookingController...)     │
├─────────────────────────────────────────────────────────────┤
│                      Service Layer                           │
│  (UserService, TripService, BookingService...)              │
├─────────────────────────────────────────────────────────────┤
│                    Repository Layer                          │
│  (UserRepository, TripRepository, BookingRepository...)     │
├─────────────────────────────────────────────────────────────┤
│                      Entity Layer                            │
│  (User, Trip, TourBooking, Route, Invoice...)               │
└─────────────────────────────────────────────────────────────┘
```

### Component-Based Architecture (Frontend)

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                               │
├─────────────────────────────────────────────────────────────┤
│    Providers (AuthProvider, QueryProvider)                   │
├─────────────────────────────────────────────────────────────┤
│    Router (Protected/Public Routes)                          │
├─────────────────────────────────────────────────────────────┤
│    Layouts (AdminLayout, CustomerLayout)                     │
├─────────────────────────────────────────────────────────────┤
│    Pages (DashboardPage, TripsPage, BookingsPage...)        │
├─────────────────────────────────────────────────────────────┤
│    Components (Button, Input, Header, Sidebar...)           │
├─────────────────────────────────────────────────────────────┤
│    Hooks (useAuth, useTravelsQuery...)                      │
├─────────────────────────────────────────────────────────────┤
│    Services (authService, travelService, api.js)            │
└─────────────────────────────────────────────────────────────┘
```
