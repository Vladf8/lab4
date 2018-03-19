package ifmo;

import javax.persistence.*;


@Entity
@Table(name = "shots" , schema = "s223868")
public class Shots {
    private int id;
    private float x;
    private float y;
    private float r;
    private boolean fit;
    public Shots(){}
    public Shots (float x, float y, float r){
        this.x =x;
        this.y =y;
        this.r=r;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "shots_id_seq")
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "x")
    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    @Basic
    @Column(name = "y")
    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    @Basic
    @Column(name = "r")
    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    @Basic
    @Column(name = "fit")
    public boolean getFit() {
        return fit;
    }

    public void setFit(boolean fit) {
        this.fit = fit;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Shots shots = (Shots) o;

        if (id != shots.id) return false;
        if (Float.compare(shots.x, x) != 0) return false;
        if (Float.compare(shots.y, y) != 0) return false;
        if (Float.compare(shots.r, r) != 0) return false;
        if (fit != shots.fit) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (x != +0.0f ? Float.floatToIntBits(x) : 0);
        result = 31 * result + (y != +0.0f ? Float.floatToIntBits(y) : 0);
        result = 31 * result + (r != +0.0f ? Float.floatToIntBits(r) : 0);
        result = 31 * result + (fit ? 1 : 0);
        return result;
    }
}
