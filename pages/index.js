import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import Comments from '../components/Comments';
// import Image from 'next/image';
// import mypic from '../components/finance.jpg';

export default function Home() {
  //Next JS routing
  //automatically creates a route for our pages. components inside the pages folder will be considered pages. It's route is then dependent to its file path

  //Index.js being the first file, is default found at:
  //    /
  //courses.js is found at:
  //    /courses

  const data = {
    title: 'Budget Tracker',
    content: "Let's Track Your Finances",
  };

  // const MyImage = () => {
  //   return (
  //     <Image
  //       src={mypic}
  //       alt="Picture of the author"
  //       width="350px"
  //       height="300px"
  //     />
  //   );
  // };

  return (
    <>
      <Banner dataProp={data} />
      <Highlights />
      <Comments />
      {/* <MyImage /> */}
    </>
  );
}
