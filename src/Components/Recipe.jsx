import React from 'react'

 const Recipe = (props) => {
  return (
          <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3" ref={props.refs}>
              <div className="blog-box">
                  <div className="post-media">
                      <a href={props.data.post_url}>    
                          <span className="detail veg"><a className="text-white" href={`#${props.data.username_url}`}>by {props.data.username}</a></span>
                            {props.data.post_img_url_src && <img src={props.data.post_img_url_src} alt="" className="img-fluid" />}
                          <div className="hovereffect"></div>
                      </a>
                  </div>

                  <div className="blog-meta big-meta"> 
                      <h4><a href={props.data.post_url} title="">{props.data.post_title}</a></h4>
                      <p className="post-description">{props.data.post_description}</p>
                        <div className="recipe-tags" dangerouslySetInnerHTML={{ __html: props.data.template_hashtag_links }} />
                  </div>
              </div> 
      </div> 
  )
}

export default Recipe;
