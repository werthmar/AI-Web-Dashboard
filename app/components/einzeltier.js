import { VscTools } from "react-icons/vsc";

export default function Einzeltier() {

    return(
        <div className="flex items-center justify-center h-screen">

            <div className='einzeltier'
                style={{
                    backgroundColor: "white",
                    padding: "40px",
                    margin: "0px 40px 0px 40px",
                    borderRadius: "25px",
                    fontSize: "24px",
                    textAlign: "center"
                    }}>
                <VscTools style={{ margin: "0 auto 30px auto" }} size={100} />
                <p>
                    In der finalen Version würden hier Informationen zu einzelnen Tieren angezeigt werden.
                    <br/><br/>
                    Diese Funktion ist momententan noch nicht vorhanden.
                </p>
            </div>
        </div>
    );
}