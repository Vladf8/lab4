package ifmo;


import javax.ejb.EJB;
import javax.ejb.Singleton;

import javax.ejb.Startup;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.util.ArrayList;
import java.util.List;


@Startup
@Singleton
@Path(value = "/usr")
public class UserManager {
    @EJB
    private DBUsrService serv  ;
    @EJB
    @Path("/signup")
    @POST
    public void addUser(@FormParam("name") String name, @FormParam("surname") String surname, @FormParam("login") String login, @FormParam("password") String password, @FormParam("mail") String email, @Context HttpServletResponse resp, @Context HttpServletRequest req) {
        try {
            Usr usr = new Usr(name, surname, login, password, email);
            serv.saveUsr(usr);
            req.getSession().setAttribute("login", login);
            req.getSession().setAttribute("shots", new ArrayList<Shots>());
            String msg = "user: "+login+" joined system ";
            //sender.sendMsg(msg);
            resp.sendRedirect("http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/check.html");
        }catch (Exception e){e.printStackTrace();}
    }

    @Path("/login")
    @POST
    public void checkAuth(@FormParam("login") String login, @FormParam("password") String password, @Context HttpServletResponse resp, @Context HttpServletRequest req){
        try {
            boolean check = serv.assertUser(login, password);
            if (check) {
                req.getSession().setAttribute("login", login);
                req.getSession().setAttribute("shots", new ArrayList<Shots>());

                String msg = "user: "+login+" entered system";
                //sender.sendMsg(msg);
                resp.sendRedirect("http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/check.html");
            } else {
                resp.sendRedirect("http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/error_page.html");
            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }
    @POST
    @Path("/secur")
    public List<String> secur(@Context HttpServletRequest req){
        List<String> list = new ArrayList<>();
        String login = (String) req.getSession().getAttribute("login");
        if(!(login==null)){
            list.add(login);}
        return  list;
    }
    @Path("/logout")
    @POST
    public void logOut(@Context HttpServletRequest req, @Context HttpServletResponse resp){
        try {
            String msg = "user: "+req.getSession().getAttribute("login")+" escaped";
            //sender.sendMsg(msg);
            req.getSession().invalidate();
            resp.sendRedirect("http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/index.html");
        }catch(Exception e){}
    }
}
