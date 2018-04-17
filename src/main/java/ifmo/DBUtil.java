package ifmo;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DBUtil {
    private static final EntityManagerFactory fact = Persistence.createEntityManagerFactory("JPAUNIT");

    public static EntityManagerFactory getFactory(){
        return fact;
    }
}
