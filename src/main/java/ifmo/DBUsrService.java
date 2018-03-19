package ifmo;

import javax.ejb.Singleton;
import javax.ejb.Stateful;
import javax.ejb.Stateless;
import javax.persistence.*;
import java.util.List;



@Stateful
public class DBUsrService {


    EntityManagerFactory fact = Persistence.createEntityManagerFactory("JPAUNIT");
    EntityManager em = fact.createEntityManager();


    public void saveUsr(Usr usr){
        em.getTransaction().begin();
        em.persist(usr);
        em.getTransaction().commit();

    }
    public boolean assertUser(String login, String password) throws NoResultException{
        try {
            Usr usr = (Usr) em.createQuery(" from Usr where login = :login").setParameter("login", login).getSingleResult();
            if (!(usr == null)) {
                if (password.hashCode() == usr.getPassword()) return true;
            }
            return false;
        }catch (NoResultException e){return false;}
    }

}
