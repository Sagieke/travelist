import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <b>
     Weather Dashbored in Flask
     </b>
        <p>
          <Input/>
          <ButtonState/>
        </p>
        <a
          
        >
        </a>
      </header>
    </div>
  );
}

export default App;



function Input(){
return(
<form>
<label for="text-form">City:</label>
<input type="text" id="text-form "/>
</form>
);
}

function ButtonState(){
return(
  <div>

<button>Submit</button>
</div>
);


}