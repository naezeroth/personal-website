/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

function WelcomeBio() {
  return (
    <StaticQuery
      query={NewbioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <Container>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 100,
                // borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `20%`,
              }}
            />
            <p>
            Hey there! Welcome to my website. My name is Apurva Shukla and 
            here you can find my <a href={'/blog/'} style={{color: '#859900'}}>blog</a>, photographs and projects. 
            Type <b style={{color: '#d33682'}}>help</b> to get started.
            </p>
          </Container>
        )
      }}
    />
  )
}

const NewbioQuery = graphql`
  query NewbioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex
`

export default WelcomeBio
