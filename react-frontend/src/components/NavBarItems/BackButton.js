import { useHistory } from "react-router-dom";


const ButtonStyle1 = {
    width: "100px",
    borderColor: "black",
    color: "black",
    height: "35px",
    borderColor: "black",
    backgroundColor: "lightgrey",
    margin: "1px",
}
export default function BackButton () {
    let history = useHistory();
    return (
        <>
          <button style={ButtonStyle1}onClick={() => history.goBack()}>Back</button>
        </>
    );
};