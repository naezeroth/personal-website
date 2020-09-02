import React from "react"
import Terminal from 'terminal-in-react';
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import WelcomeBio from "./welcome-bio"
import { StaticQuery, graphql } from "gatsby"
import { IconLink } from "./link"
import { Github, Linkedin, Email } from "./social-icons"

class CustomTerminal extends React.Component {
  componentDidMount() {
    console.log("TERMINAL IS MOUNTED");
  }
  render() {
    return (
      <StaticQuery
        query={terminalQuery}
        render = {data => {
          const { publicURL } = data.resume
          const { social } = data.site.siteMetadata
          return (
            <TerminalWrapper>
              <Terminal
                startState='maximised'
                promptSymbol="$"
                allowTabs={false}
                outputColor='#93a1a1'
                prompt='#d33682'
                color='#657b83'
                backgroundColor='#073642'
                barColor='black'
                style={{ fontWeight: "bold", fontSize: "1.5em",  }}
                actionHandlers={{
                  handleClose: () => {
                  },
                  handleMaximise: () => {
                  },
                  handleMinimise: () => {
                  }
                }}
                commandPassThrough={(cmd) => {
                  console.log(cmd);
                  // do something async
                  return(<span>
                      -bash:${cmd}: command not found, please type  <b style={{color: '#d33682'}}>help</b> to see all legal commands
                  </span>);
                }}
                commands={{
                  'whoami': whoamiCommand(social),
                  'Whoami': whoamiCommand(social),       
                  'blog': () => window.open('/blog', "_self"),
                  'Blog': () => window.open('/blog', "_self"),
                  'projects': () => {return("Projects here")},
                  'Projects': () => {return("Projects here")},
                  'photos': () => {return("Photos here")},
                  'Photos': () => {return("Photos here")},
                  'resume': () => window.open(publicURL, "_self"),
                  'Resume': () => window.open(publicURL, "_self"),
                  'Help': helpCommand,
                  'help': helpCommand, 
                  show: () => {return(<WelcomeBio/>)}
                }}
              />
            </TerminalWrapper>
          )
        }}
        />
    )
  }
}

//Some specific CSS modifications to Terminal
const TerminalWrapper = styled.div`
  .terminal-base .sc-bxivhb { 
    max-width: 100% !important;
    height: ${rhythm(1.2)} !important;
    border-radius: 20px 20px 0px 0px;
  }
  .terminal-base .sc-EHOje {
    max-width: 100% !important;
    overflow-y: auto !important;
    height: ${rhythm(20)} !important;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
  }
  .sc-htoDjs {
    padding-top: 0px;
  }
  .sc-dnqmqq {
    padding: 0px 10px 0px 0px;
  }
`
const terminalQuery = graphql`
  query terminalQuery {
    resume: file(
      extension: {eq: "pdf"},
      name: {eq: "ApurvaShukla_Resume"}
      
    ){
      publicURL
    } 
    site {
      siteMetadata {
        social {
          twitter,
          linkedin, 
          mail, 
          github,
        }
      }
    } 
  }
`

const helpCommand = () => {return(<span>
  <p style={{color: '#268bd2'}}>
    To use this terminal, simply type any of the commands listed below.
  </p>
  <p>
    <b style={{color: '#b58900'}}>whoami</b> - get to know me + how to contact me
  </p>
  <p>
    <b style={{color: '#b58900'}}>blog</b> - checkout my blog
  </p>
  <p>
    <b style={{color: '#b58900'}}>projects</b> - checkout the projects I've worked on
  </p>
  <p>
    <b style={{color: '#b58900'}}>photos</b> - checkout my photography portfolio
  </p>
    <b style={{color: '#b58900'}}>resume</b> - check out my resume
</span>)}

const whoamiCommand = (social) => {return(<span><p>
  Hey there! Welcome to my website. My name is Apurva Shukla and 
  here you can find my <a href={'/blog/'} style={{color: '#859900'}}>blog</a>, photographs and projects. 
  Type help to get started. You can find me on {""}     
  <IconLink href={social.github}><Github/></IconLink>
  , {""}
  <IconLink href={social.linkedin}><Linkedin/></IconLink>
  {""} or {""}
  <IconLink href={social.mail}><Email/></IconLink>
  .
  </p>
  </span>)}

export default CustomTerminal