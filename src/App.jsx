import { Container , Button } from "@mui/material";
import Header from "./components/Header/Header.jsx";
import NewsFeed from "./components/NewsFeed/NewsFeed.jsx";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { styled } from "@mui/material/styles";
function App() {
  const [articles, setArticles] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  const [loading , setLoading]=useState(false)

  const pageNumber=useRef(1)
  const queryValue=useRef("")
  const Page_Size=5;
  const Footer = styled("div")(({ theme }) => ({
    margin: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between",
    }));



  async function loadData() {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${pageNumber.current}&pageSize=${Page_Size}&country=us&apiKey=a0127922af98441384be2255431e267b`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.articles) { // Check if articles exist
        return data.articles.map(article => {
          const { title, description, author, publishedAt, urlToImage ,url} = article;
          return {
            url,
            title,
            description,
            author,
            publishedAt,
            image: urlToImage
          };
        });
      }
      return []; // Return empty array if no articles
    } catch (err) {
      setError(err.message);
      return []; // Return empty array in case of error
    }
  }

  useEffect(() => {
 fetchAndUpdateArticales()
 
 }, []);

 const fetchAndUpdateArticales =
  ()=>{
    setLoading(true)
    loadData().then((newData)=>{
      setArticles(newData);
      setLoading(false) ;
 })
};
const debouncedData=debounce(fetchAndUpdateArticales,750)

  const handleSearchChange = (newQuery) => {
    pageNumber.current=1;
    queryValue.current=newQuery;
    debouncedData();

  };

  const handlePreviousClick=()=>{
    pageNumber.current-=1
    fetchAndUpdateArticales()
  }
  const handleNextClick=()=>{
pageNumber.current+=1
fetchAndUpdateArticales()
  }

  return (
    <Container >
      <Header onSearchChange={handleSearchChange} />
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      <NewsFeed articles={articles} loading={loading} />
     <Footer>
     <Button variant="outlined" onClick={handlePreviousClick} disabled={pageNumber.current === 1} >Previous</Button>
     <Button variant="outlined" onClick={handleNextClick} disabled={articles.length<Page_Size} >Next</Button>
     </Footer>
    </Container>
  );
}

export default App;