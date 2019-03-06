import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

export default class extends React.Component {
  state = { 
    errorMessage: ""
  };

 
  render = () => (
    <div>
      <h1>Helga says hi!</h1>
    </div>
  );

};