package com.exam;

// import com.exam.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamserverApplication  implements CommandLineRunner{
    
    // @Autowired
    // private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Hello, Starting Code !!!");
        
//        User user = new User();
//        user.setFirstName("Abhijit");
//        user.setLastName("Shermale");
//        user.setUserName("Abhijit99");
//        user.setPassword("Abhijit99");
//        user.setPassword("Abhijit99");
//        user.setEmail("abhi@gmail.com");
//        user.setProfile("default.png");
//        
//        Role role = new Role();
//        role.setRoleId(44L);
//        role.setRoleName("ADMIN");
//        
//        Set<UserRole> userRoleSet = new HashSet<>();
//        
//        UserRole userRole = new UserRole();
//        userRole.setRole(role);
//        userRole.setUser(user);
//        
//        userRoleSet.add(userRole);
//        
//        User user1 = this.userService.createUser(user, userRoleSet);
//        System.out.println(user1.getUserName());
        
    }

}
