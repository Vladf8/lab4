package ifmo;

import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.faces.bean.SessionScoped;
import javax.inject.Inject;
import javax.json.JsonArray;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.io.Console;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.logging.Logger;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Stateful
@SessionScoped
@Path("/point")
public class ShotManager {

    private DBShotServ serv =new DBShotServ();

    @POST
    @Path("/check")
    public void check(@FormParam("x") float x,@FormParam("y") float y , @FormParam("r") float r, @Context HttpServletRequest req, @Context HttpServletResponse resp){
        try {
            Shots shot = new Shots(x, y, r);
            if (((x >= -r) && (y >= -r/2) && (x <= 0) && (y <= 0)) || ((x >= 0) && (y <= 0) && (y >= 0.5*x-r/2)) || ((x >= 0) && (y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r/2, 2)))) {
                shot.setFit(true);
            } else {
                shot.setFit(false);
            }
            List<Shots> list = (List<Shots>) req.getSession().getAttribute("shots");
            list.add(shot);
            serv.saveShot(shot);
            resp.sendRedirect("http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/check.html");
        }catch (Exception e){}
    }
    @POST
    @Path("/update")
    public void update(@Context HttpServletRequest req,@FormParam("r") float r){
        List<Shots> listsh = (List<Shots>) req.getSession().getAttribute("shots");
        for(int i=0;i<listsh.size();i++){
            Shots sh = listsh.get(i);
            float x = sh.getX();
            float y = sh.getY();
            sh.setR(r);
            if (((x >= -r) && (y >= -r/2) && (x <= 0) && (y <= 0)) || ((x >= 0) && (y <= 0) && (y >= 0.5*x-r/2)) || ((x >= 0) && (y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r/2, 2)))) {
                sh.setFit(true);
            } else {
                sh.setFit(false);
            }
            serv.updateShot(sh);
        }
    }
    @POST
    @Path("/getpoints")
    public String getShots(@Context HttpServletRequest req){
       // return (List<Shots>) req.getSession().getAttribute("shots") ;
            //return serv.getAllShots();
        String s =  new Gson().toJson(req.getSession().getAttribute("shots"));
        return s;
    }

    @POST
    @Path("/test")
    public String test(){
        return "success";
    }
}
