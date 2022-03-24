import { useState, useRef, useCallback } from "react";
import Recipe from "./Components/Recipe";
import useRecipeSearch from './Hooks/useRecipeSearch'
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";
import './Style/App.css'


const App = ()=> {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState()
  const {loading,recipe,hasMore,error,nextPage} = useRecipeSearch(query, page)

  const observer = useRef()
  const lastRecipeElementRef = useCallback(node =>{
      if(loading) return
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries =>{
          if(entries[0].isIntersecting && hasMore){
             setPage(nextPage)
          }
      })
      if(node) observer.current.observe(node)
      
  },[loading, hasMore,nextPage])

  const handleSearch = (e)=>{
    setQuery(e.target.value)
    setPage("")
  }
  
   return (
    <div className="App">  
      <div id="wrapper">
          <header className="header" >     
          <div className="container flex">
            <div className="w-50">
                <div className="widget">
                            <h1 className="widget-title font-weight-bold text-white">Recipe Gallery</h1>
                            <form className="search-form">
                                <input type="text" value={query} className="form-control" onChange={handleSearch} placeholder="Search for Recipes" />
                            </form>
                        </div>
                </div>
            </div> 
        </header>
          <section className="section lb text-muted">
              <div className="container">
                  <div className="row grid-style">
                
                    {
                      recipe.map((recipeItem,index)=>{
                        if(recipe.length === index+1){
                          return (
                            <div key={index} ref={lastRecipeElementRef}>
                                <Recipe data={recipeItem} />
                              </div>)
                        }else{
                          return <Recipe key={index} data={recipeItem} />
                      }  
                      })
                    }
                    <div>{((loading && !error) ) && <FadingBalls  color="lightgreen" width="30px" height="30px" duration="3s" />}</div>
                    <div >{( !loading && recipe.length == 0) && <h2 className="notfound-message">Not Found</h2>}</div>


                  </div> 
                  
              </div>
          </section>
      </div>
    </div>

  );
}

export default App;
