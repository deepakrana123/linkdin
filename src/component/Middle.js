import styled from "styled-components";
import PostModal from "./PostModal";
import {useEffect,useState} from "react";
import {connect} from "react-redux";
import {getArticleAPI} from "../actions";
import ReactPlayer from "react"

const Main = (props) => {
    console.log(props);
    const [showModal ,setShowModal] = useState("close");

    useEffect(() => {
        props.getArticles();
    },[]);
    const handleClick = (e) => {
        console.log(e);
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            return ;
        }
        switch(showModal) {
            case "open" :
                setShowModal("close");
                break;
            
            case "close" :
                    setShowModal("open");
                    break;

        default:
            setShowModal("close");
            break;
        }
    };
    console.log(showModal);
    console.log(props.getArticles());
    return (
        
        <Conatiner>
        <ShareBox>
        <div>
        { props.user && props.user.photoURL ?
            <img src={props.user.photoURL} alt="/"/>
            :
        
        <img src="/images/user.svg" alt="/" />
        }
        <button onClick={handleClick}> Start a post </button>
        </div>
        <div>
        <button>
        <img src="/images/photo.svg"  alt="/" />
        <span>Photo</span>
        </button>
        <button>
        <img src="https://tse2.mm.bing.net/th?id=OIP.wg8nURMxrVWL087hRzQnfAHaFj&pid=Api&P=0&w=212&h=160"  style={{"width":16 ,"height":16}} alt="/" />
        <span>Video</span>
        </button>
        <button>
        <img src="https://tse1.mm.bing.net/th?id=OIP.iEtQHT-7JD4GtdP8bwhP-gHaHa&pid=Api&rs=1&c=1&qlt=95&w=110&h=110" style={{"width":16 ,"height" :16}} alt="/" />
        <span>Events</span>
        </button>
        <button>
        <img src="https://tse1.mm.bing.net/th?id=OIP.FTlVXR9bub3LjN-0xrvR-gHaHa&pid=Api&rs=1&c=1&qlt=95&w=122&h=122" style={{"width":16 ,"height" :16}}  alt="/"  />
        <span> Write Article</span>
        </button>
        </div>
        </ShareBox>
        <Content>
        {props.loading && <img src="http://cdn.lowgif.com/full/dc86e54ceca03be4-loading-spinner-animated-gif-83320-mediabin.gif" alt="/public"/>
    
    }
    {props.articles.length > 0 && 
    props.articles.map((article,key)=>(
       <Article key={key}>
        <ShareCard>
        <a href="/">
                 <img src={article.actor.image} alt="" />
        <div>
           <span>{article.actor.title}</span>
            <span>{article.actor.description}</span>
           <span>{article.actor.date.toDate().toLocaleString()}</span>
        </div>
        </a>
        <button>
        <img src="https://tse1.mm.bing.net/th?id=OIP.pCH2lCRsmti1J7E08uZ85AHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121" style={{"width":16 , "height":16}} alt="" />
         </button>     
   </ShareCard>
   <Description>{article.description}</Description>
   <Shareimg>
         <a href="/">
       {   !article.sharedImg && article.video ? (<ReactPlayer width={'100%'} url={article.video}/>
         )
    :(
        article.sharedImg && <img src={article.sharedImg} alt="/" />
    )
         }
  </a>
   </Shareimg>
         <SocialCount>
   <li>
   <button>
        <img src="https://tse1.mm.bing.net/th?id=OIP.kKgFAiaDJzj-jCPPnYRtPAHaJ-&pid=Api&rs=1&c=1&qlt=95&w=77&h=104" alt="/" style={{"width":16 , "height":16}} alt="/"/>
        <img src="https://tse1.mm.bing.net/th?id=OIP.kKgFAiaDJzj-jCPPnYRtPAHaJ-&pid=Api&rs=1&c=1&qlt=95&w=77&h=104" alt="/" style={{"width":16 , "height":16}} alt="/"/>
   <span>75</span>
   </button>
   </li>
   <li>
          <a href="/">2 Comments</a>
   </li>
   </SocialCount>
   <SocialAction>
   <button>
   <img src="https://tse1.mm.bing.net/th?id=OIP.qyjjdgsH1Ti4sYHtVBT1-AHaHa&pid=Api&rs=1&c=1&qlt=95&w=119&h=119"  alt="/" style={{"width":16,"height":16}}/>
  <span>Like</span> </button>
  <button>
  <img src="https://tse1.mm.bing.net/th?id=OIP.yCA5PzhobvlCEvQRaEvGqwHaHa&pid=Api&rs=1&c=1&qlt=95&w=93&h=93" alt="/" style={{"width":16,"height":16}}/>
  <span>Unlike</span></button>
  <button>
  <img src="https://tse1.mm.bing.net/th?id=OIP.cGgUsVgCngjYxzY-u4NKawHaHY&pid=Api&rs=1&c=1&qlt=95&w=121&h=120" alt="/" style={{"width":16,"height":16}}/>
  <span>Comments</span></button>
  <button>
  <img src="https://tse1.mm.bing.net/th?id=OIP.vnnD1JVM4Cv_OOAdPrl4MQHaHx&pid=Api&rs=1&c=1&qlt=95&w=110&h=115" alt="/" style={{"width":16,"height":16}}/>
  <span>Connects</span></button>
  </SocialAction>
</Article>
    ))}
</Content>
<PostModal  showModal = {showModal} handleClick = {handleClick} />
     </Conatiner>
            )}
  




const Conatiner = styled.div`
grid-area : main;
`
;


const CommonCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:8px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none;
box-shadow:0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;


const ShareBox = styled(CommonCard)`
display:flex;
flex-direction:column;
color:#958b7b;
margin:0 0 8px;
background:white;
div{
    button{
        outline:none;
        color:rgba(0,0,0,0.6);
         font-size:14px;
         line-height:1.5;
         min-height:48px;
         background:transparent;
         border:none;
         display:flex;
         align-items:center;
         font-weight:600;
    }

    &:first-child{
        display:flex;
        align-items:center;
        padding:8px 16px 0px 16px;
        img{
            width:48px;
            border-radius:50%;
            margin-right:8px;
        }
        button{
            margin:4px 0px 0px 0px;
            flex-grow:1;
            border-radius:35px;
            padding-left:16px;
            border:1px solid rgba(0,0,0,0.15);
            border-radius:35px;
            background-color:white;
            text-align:left;
        }
    }
    &:nth-child(2)
    {
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        padding-bottom:4px;
        button {
            img{
                margin:0 4px 0 -2px;
            }
            span {

                color:#70b5f9;
            }
        }
    }
}`;


const Article = styled(CommonCard)`
padding:0;
margin:0 0 8px ;
overflow:visible;`


const ShareCard = styled.div`
padding-right:40px;
flex-wrap:nowrap;
padding:12px 16px 0;
margin-bottom:8px;
align-items:center;
display:flex;
a {
   
     margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;
   img 
   {
       width:48px;
       height:48px;
   }
    & > div {
        display:flex;
        flex-direction:column;
        flex-grow:1;
        flex-basis:0;
        margin-left:8px;
        overflow:hidden;
        span {
            text-align:left;
            &:first-child {
                font-size:14px;
                font-weight:700;
                color:rgba(0,0,0,1);
            
            }
            &:nth-child(n + 1){
                font-size:12px;
                color:rgba(0,0,0,0.6);
            }
        }
    }
}
button {
    position:absolute;
    right:12px;
    top:0;
    background:transparent;
    border:none;
    outline:none;
}
`;

const Description = styled.div`
padding:0 16px;
overflow:hidden;
color:rgba(0,0,0,0.9);
font-size:14px;
text-align:left;
`;

const Shareimg = styled.div`
margin-top:8px;
width:100%;
display:block;
position:relative;
background-color:#f9fafb;
img {
    object-fit:contain;
    width:100%;
    height:100%;
}`;

const SocialCount = styled.ul`
   line-height:1.3;
   display:flex;
   align-items:flex-start;
   overflow:auto;
   margin:0 16px;
   padding:8px 0;
   border-bottom: 1px solid #e9e5df;
   list-style:none;
   li {
       margin-right:5px;
       font-size:12px;
       button {
           display:flex;
           align-items:center;
           padding:8px;
           color:#0a56c2;
           @media(min-width:768px){
               span
               {
                   margin-left:8px;
               }
           }
       }
   }
`;


const Content = styled.div`
   text-align:center;
   & > img {
       width:30px;
   }
`;

const SocialAction = styled.div`
align-items:center;
display:flex;
justify-content:flex-start;
margin:0;
min-height:40px;
padding:4px 8px;
button {
    display:inline-flex;
    align-items:center;
    padding:8px;
    color:#0a66c2;

  @media (min-width:768px){
      span{
          margin-left:8px;
      }
  }
}

`;
const mapStateToProps = (state) => {
    return {
        user:state.userState.user, 
        loading:state.articleState.loading,
        articles:state.articleState.articles,
    }
  };
  
  const mapDispatchToProps = (dispatch) => ({
   getArticles: () => dispatch(getArticleAPI()),
  });

export default connect(mapStateToProps , mapDispatchToProps)(Main)
