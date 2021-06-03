
import styled from "styled-components";
import Left from "./Left";
import Right from "./Right";
import Middle from "./Middle";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
const Home=(props)=> {
    return (
        <Container>
        {props.user && <Redirect to="/home" />}

       
        <Section>
        <h5>
        <a href="/"> Hiring in a Hurry </a>
        <p>Find talented pros in time with record Upwork and Keep bussiness</p>
        </h5></Section>
        <Layout>
        <Left/>
        <Middle/>
        <Right/>

        </Layout>
        </Container>
    )
}

 
    

const Container=styled.div`
padding-top:52px;
max-width:100%;
`;


const Section=styled.div`
min-height:50%;
padding:16px 0;
box-sizing:content-box;text-align:center;
text-decoration:underline;display:flex;justify-content:center;
h5{
    color:red;
    font-size:14px;
    a{
        font-weight:700;
    }
}
p{
    font-weight:700;
    color:#434649;
    font-weight:600;
}
@media(max-width:760px){
    flex-direction:column;
    padding:0 5px;
    p{
        color:red;
        font-size:0 5px;
    }
}`;

const Layout=styled.div`
display:grid;
grid-template-areas:"leftside main rightside";
grid-template-columns:minmax(0,5fr) minmax(0,13fr) minmax(300px,7fr);
column-gap:25px;
row-gap:25px;
grid-template-rows:auto;
margin:25px 0;
@media(max-width:768px){
    display:flex;
    flex-direction:column;
    padding:0 5px;
}`



const mapStateToProps = (state) => {
    return {
        user : state.userState.user ,
    } ;
 };


export default connect(mapStateToProps)(Home);