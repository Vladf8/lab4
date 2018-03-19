package ifmo;

import javax.ejb.Stateful;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;


@Stateful
public class DBShotServ {

    EntityManagerFactory fact = Persistence.createEntityManagerFactory("JPAUNIT");
    EntityManager em = fact.createEntityManager();
    public void saveShot(Shots shot){
        em.getTransaction().begin();
        em.persist(shot);
        em.getTransaction().commit();
    }
    public void updateShot(Shots shot){
        em.getTransaction().begin();
        float _x = shot.getX();
        float _y = shot.getY();
        float _r = shot.getR();
        boolean _fit = shot.getFit();
        int _id = shot.getId();
        Query query = em.createQuery("UPDATE Shots sh set sh.x=:x,sh.y=:y,sh.r=:r,sh.fit=:fit where sh.id = :id");
        query.setParameter("x",_x);
        query.setParameter("y",_y);
        query.setParameter("r",_r);
        query.setParameter("fit",_fit);
        query.setParameter("id",_id);
        query.executeUpdate();
        em.getTransaction().commit();
    }
    public List<Shots> getAllShots(){
        return  em.createQuery("from Shots ").getResultList();
    }
}
