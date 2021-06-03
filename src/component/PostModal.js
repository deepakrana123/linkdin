import ReactPlayer from "react-player";
import { useState } from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import firebase from "firebase";
import {postArticleAPI} from "../actions";
const PostModal=(props)=> { 
    console.log(props);

    const [editorText,setEditorText] = useState(" ");
    const [shareImage , setShareImage] = useState(" ");
    const [videoLink, setVideoLink] = useState(" ");
    const [assetArea, setAssetArea] =useState(" ");
    const handleChange = (e) =>
    {
        const image = e.target.files[0];


        if(image === "" ||  image === undefined){
            alert(`not an image , the file is a ${typeof image}`);
            return;
        }

        setShareImage(image);
    };

    const switchAssestArea = (area) =>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);

    };

    const postArticle = (e) => {
        console.log("post malcone :")
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            console.log("hello")
            return;
        }

        const payload ={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            timestamp:firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        reset(e);
    }
    const reset = (e) =>{

        setEditorText(" ");
        setShareImage("");
        setVideoLink(" ");
        setAssetArea(" ");
        props.handleClick(e);

    };
    console.log(shareImage);
    return (
        <>
        {props.showModal === 'open' &&
        <Container>
        <COntent> <Header>
        <h2> Create a post</h2>
        <button onClick={(event) => reset(event)}>
        <img src="https://tse1.mm.bing.net/th?id=OIP.8EcL6-wqq1XcNmJNG_buOQHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121" alt="/" style={{"width":6 , "height":16}} />
        </button>
        </Header>
        <ShareContent>
        <UserInfo>
        {props.user.photoURL ? (
            <img src={props.user.photoURL} alt="/" />
       
        ):(
            <img src="/images/user.svg" alt="/" />
       
        )}
       <span>{props.user.displayName}</span>
        <Editor>
         <textarea
           value = {editorText}
         onChange = {(e) => setEditorText(e.target.value)} 
         placeholder = " What do you want to talk about" 
         autoFoucs={true} />
         {  assetArea === "image" ?(
         <UploadImage>
         <input type = "file"
         accept = "image/gif ,  image/jpeg , image/png"
         name ="image"
         id ="file"
         style =  {{display:"none"}}
         onChange = {handleChange}
         />
         <p>
         <label htmlFor="file">Select an image to share</label>
         </p>
         {shareImage && <img src={URL.createObjectURL(shareImage)} alt="/"></img>}
         </UploadImage>
         ):(
             assetArea === "media" && (
         <>
         <input type = "text"
        placeholder = "Please input a video link"
         id = "file"
         value = {videoLink}
         onChange = {(e)=> setVideoLink(e.target.value)}
         />
         {videoLink && (<ReactPlayer width={'100%'} url={videoLink}/>)}
         </>
)         )

             }
     
         
     </Editor>
        
        </UserInfo>
        </ShareContent>
        <ShareCreation>
        <AttachAssets>
        <AttachButton onClick = {() => switchAssestArea("image")}>
             <img src="https://static.thenounproject.com/png/358015-200.png" style={{"width":16 , "height":16}} alt="/" />
        </AttachButton>
        <AttachButton  onClick = {() => switchAssestArea("media")}>
             <img src="https://static.thenounproject.com/png/1593106-200.png" style={{"width":16 , "height":16}} alt="/" />
        </AttachButton>
       </AttachAssets>
       <ShareComment>
       <AttachButton>
              <img src="/images/share.svg" alt="/" />
       </AttachButton>
       </ShareComment>
       <PostButton disabled={!editorText ? true :false}
       onClick={(event) => postArticle(event)}> Post </PostButton>
        </ShareCreation>
       
        
        </COntent>
      </Container>
          }
      </>
     
      
      
    );
};


const Container = styled.div`
position:fixed;
/* take over the browser */
top:0;
left:0;
right:0;
bottom:0;
z-index:9999;
color:black;
background-color:rgba(0,0,0,0.8);
animation:fadeIn 0.3s;

`;

const COntent = styled.div`
width:100%;
max-width:552px;
background-color:white;
max-height:90%;
overflow:initial;
border-radius:5px;
position:relative;
display:flex;
flex-direction:column;
top:32px;
margin:0 auto;
`;
const Header = styled.div`
display : block;
padding : 10px 20px;
border-radius: 1px solid rgba(0,0,0,0.15);
font-size : 16px;
line-height : 1.5;
color : rgba(0,0,0,0.6);
font-size:400;
display:flex;
justify-content:space-between;
align-items:center;

button {
    height:40px;
    width:40%;
    min-width:auto;
    color:rgba(0,0,0,0.15);
    img {
        pointer-events:none;
        width:16px;
        height:16px;
    }
}
`;

const ShareContent = styled.div`
display:flex;
flex-grow:1;
flex-direction:column;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding:0px 12px;
`;

const UserInfo = styled.div`
display:flex;
align-items:center;
padding:12px 24px;
svg , 
img {
    width:48px;
    height:48px;
    background-color:content-box;
    border:2px solid transparent ;
    border-radius:50%;

}

span {
    font-weight:600;
    font-size:16px;
    line-height:1.5;
    margin-left:5px;
}
`;

const ShareCreation = styled.div`
display:flex;
justify-content:space-between;
padding:12px 24px 12px 16px;
`;
const AttachButton=styled.div`
display:flex;
align-items:center;
height:60px;
min-width:auto;
color:rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
align-items:center;
display:flex;
padding-right:8px;

 ${AttachButton} {
     width:40%;
    
}`;

const ShareComment = styled.div`
padding-left:8px;
margin-right:auto;
border-left:1px solid rgba(0,0,0,0.15);
 ${AttachButton} {
    svg {
        margin-right:5px;
    }
   
}
`;
const PostButton = styled.div`
min-width:60px;
border-radius:20px;
padding-left:16px;
padding-right:16px;
background:${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
color:${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white" )};

&:hover {
        background:${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#0041")}
}`;


const Editor = styled.div`
 padding:12px 24px;

 textarea {
     width:100%;
     min-height:100px;
     resize:none;


 }

 input {
     width:100%;
     height:35px;
     font-size:16px;
     margin-bottom:20px;
 }
`;

const UploadImage = styled.div`
text-align:center;
img{
    width:100%;
}`;

const mapStateToProps = (state) => {
  return {
      user:state.userState.user, 
  }
};

const mapDispatchToProps = (dispatch)=>({
 postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);

