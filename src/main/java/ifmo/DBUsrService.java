package ifmo;

import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

@Stateful
public class DBUsrService {


    EntityManagerFactory fact = DBUtil.getFactory();
    EntityManager em = fact.createEntityManager();

    public void saveUsr(Usr usr){
        em.getTransaction().begin();
        em.persist(usr);
        em.getTransaction().commit();

    }
  public boolean assertUser(String login, Integer password) throws NoResultException{
        try {
            Usr usr = (Usr) em.createQuery(" from Usr where login = :login").setParameter("login", login).getSingleResult();
            if (!(usr == null)) {
                if (password.hashCode() == usr.getPassword()) return true;
            }
            return false;
        }catch (NoResultException e){return false;}
  }

}
