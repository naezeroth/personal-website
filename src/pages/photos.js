import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
import Button from "../components/button"
import CustomGallery from "../components/custom-gallery"

class Photos extends React.Component {
  render() {
    // console.log(data);
    const { data } = this.props
    console.log(data);
    const siteTitle = data.site.siteMetadata.title
    var natural= data.natural.edges.map(x => ({
      ...x,
      // srcset: x.srcSet,
      // caption: x.title
    }))
    var built= data.natural.edges.map(x => ({
      ...x,
      // srcset: x.srcSet,
      // caption: x.title
    }))
    var people= data.natural.edges.map(x => ({
      ...x,
      // srcset: x.srcSet,
      // caption: x.title
    }))
    // console.log("test is ", test)
    var allPhotos = {natural, built, people}
    console.log("all photos is", allPhotos);
    
    // const posts = data.allMdx.edges
    // const [currentImage, setCurrentImage] = useState(0);
    // const [viewerIsOpen, setViewerIsOpen] = useState(false);

    // const openLightbox = useCallback((event, { photo, index }) => { //TODO move this to own component instead of page
    //   setCurrentImage(index);
    //   setViewerIsOpen(true);
    // }, []);

    // const closeLightbox = () => {
    //   setCurrentImage(0);
    //   setViewerIsOpen(false);
    // };

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <CustomGallery photos={allPhotos}/>
        <Link to="/">
          <Button marginTop="85px">Go Home</Button>
        </Link>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    natural:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"natural"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              meta {
                dateTaken
              }
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
    built:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"built"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              meta {
                dateTaken
              }
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
    people:allFile(filter:{extension:{regex:"/(jpeg|jpg)/"},  sourceInstanceName:{eq:"people"}}) {
      edges {
        node {
          childImageSharp {
            # originalName
            sizes(maxWidth: 1000) {
               ...GatsbyImageSharpSizes
            }
            fields {
            exif {
              meta {
                dateTaken
              }
              raw {
                image {
                  Make
                  Model
                }
                exif {
                  DateTimeOriginal
                  ISO
                  FNumber
                  ShutterSpeedValue
                  ApertureValue
                }
              }
            }
          }
          }
        }
      }
    }
  }
`
//https://www.npmjs.com/package/exif //For exif details
// Sub this instead of ...GatsbyImageSharpSizes in igraphql
// fluid(maxWidth: 300) {
//   # base64
//   # aspectRatio
//   src
//   # srcSet
//   # sizes
// }

export default Photos