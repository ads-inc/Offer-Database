//style.js
const style = {
  bottleBox: {
    width:'80%',
    margin:'0 auto',
    fontFamily:'Helvetica, sans-serif'
  },
  header: {
    display: 'inline-block',
    textTransform: 'capitalize'
  },
  title: {
    textAlign:'center',
    textTransform:'uppercase'
  },
  bottleList: {
    border:'1px solid #f1f1f1',
    boxShadow: '0 0 5px #eee',
    padding:'0 12px',
    maxHeight:'70vh',
    overflow:'scroll'
  },
  bottle: {
    backgroundColor:'#fafafa',
    width: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
    fontSize:'.85rem'
  },
  bottleInner: {
    width: '100%',
    margin: '10px',
    padding: '5px'
  },
  bottleStep: {
    width: '50%',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'top',
    position: 'relative'
  },
  bottleStepInner: {
    padding: '5px 10px'
  },
  bottleImage: {
    width: '100%',
    display: 'block',
    padding: '5px 0'
  },
  imageHeader: {
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.541176)',
    backgroundColor: 'rgba(255, 255, 255, 0.541176)',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '20ch',
    paddingLeft: 0,
    padding: 5,
    width: 'auto',
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 2
  },
  bottleModify: {
    textAlign: 'center',
    padding: '10px 5px'
  },
  bottleForm: {
    // display:'flex',
    // flexFlow:'row wrap',
    // justifyContent:'space-between'
  },
  bottleFormStep1: {
    minWidth:'150px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    flex:'2',
    verticalAlign: 'top'
  },
  bottleFormStep2: {
    flex:'2',
    minWidth:'400px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    borderRadius:'3px',
    verticalAlign: 'top'
  },
  bottleFormPost: {
    // minWidth:'75px',
    // flex:'1',
    // height:'40px',
    // margin:'5px 3px',
    // fontSize:'1rem',
    // backgroundColor:'#A#CDFD',
    // borderRadius:'3px',
    // color:'#fff',
    // textTransform:'uppercase',
    // letterSpacing:'.055rem',
    // border:'none'
    verticalAlign: 'top'
  },
  updateLink: {
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'.7rem'
  },
  deleteLink: {
    display: 'inline-block',
    right: '0',
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'.7rem',
    color:'black',
    backgroundColor: 'red',
    borderRadius: '5px',
    textAlign: 'right',
    padding: '10px 5px'
  },
  homeLinkInner: {
    // verticalAlign: 'middle'
    margin: 0
  },
  homeLink: {
    display: 'block',
    padding: '10px 5px'

  },
  homeLinkContainer: {
    width: '200px',
    height: '80vh',
    position: 'fixed',
    marginbottom: '20px',
    borderRight: '1px solid #777'
  },
  homeMenu: {
    width: '100%',
    padding: '50px 0 0 0'
  },
  backArrow: {
    display: 'inline-block',
    position: 'absolute',
    left: 20,
    fontSize: '35px',
    textDecoration: 'none'
  },
  loginForm: {
    textAlign: 'center',
    width: '30%',
    margin: 'auto',
    minWidth: 808
  },
  loginTitle: {
    fontWeight: 'bold'
  },
  loginField: {
    width: '100%',
    borderRadius: 5,
    boxShadow: '0 0 5 #eee'
  },
  loginSubmit: {
    width: '80%',
    margin: 'auto',
    borderRadius: 5,
    boxShadow: '0 0 5 #eee'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 700,
    height: 700,
    overflowY: 'auto',
    marginBottom: 24,
  },
  menuItem: {
    width: 256
  },
  imageDrop: {
    width: 256,
    height: 50,
    borderWidth: 2,
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: 5,
    marginBottom: 10

  },
  dropText: {
    textAlign: 'center',
    margin: 0,
    padding: 5
  }
}
module.exports = style;
