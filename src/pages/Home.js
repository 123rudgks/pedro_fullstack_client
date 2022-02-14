import React from "react";
import { useEffect, useState, useContext } from "react";
// URL 뒤에 /어쩌구저쩌구 를 붙여서 Link 처럼 이동 시켜준다.
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

function Home() {
  const [listOfPosts, setListsOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  // 렌더링 될 때마다 get을 새로 받아오게 해줌
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("https://pedrotech-full-stack-blog.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListsOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (PostId) => {
    axios
      .post(
        "https://pedrotech-full-stack-blog.herokuapp.com/likes",
        { PostId: PostId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        //likes 클릭시 re-render해주기 위해
        setListsOfPosts(
          listOfPosts.map((post) => {
            if (post.id === PostId) {
              if (response.data.liked) {
                alert("liked :)");
                // likes 클릭시 post.Likes.length의 길이를 1개씩 늘려주려고 아무 숫자나 넣은 것임
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                alert("unliked :(");
                // post.Likes의 길이를 하나 줄여주기 위함
                // 로직이 좀 이상해보이나 우리는 Likes의 길이만 신경쓰면 되므로 it is working anyway
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(PostId)) {
          // 해당 포스트를 like 한 적이 있으면 like 취소해줌
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != PostId;
            })
          );
        } else {
          // 해당 포스트를 like 한적이 없으면 like 추가해줌
          setLikedPosts([...likedPosts, PostId]);
        }
      });
  };
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="buttons">
                {likedPosts.includes(value.id) ? (
                  <ThumbUpAltIcon
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  />
                ) : (
                  <ThumbUpOffAltIcon
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  />
                )}
                {/* <ThumbUpAltIcon
                className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                /> */}
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
