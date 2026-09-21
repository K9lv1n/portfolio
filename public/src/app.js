(function () {
  'use strict'
  var e = React.createElement
  var data = window.PORTFOLIO

  function Icon(props) {
    var n = props.name
    var s = props.size || 18
    var c = null
    if (n === 'arrow') c = [e('path',{key:1,d:'M5 12h14'}),e('path',{key:2,d:'m14 7 5 5-5 5'})]
    if (n === 'download') c = [e('path',{key:1,d:'M12 3v12'}),e('path',{key:2,d:'m7 10 5 5 5-5'}),e('path',{key:3,d:'M5 21h14'})]
    if (n === 'sun') c = [e('circle',{key:1,cx:12,cy:12,r:3.5}),e('path',{key:2,d:'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'})]
    if (n === 'moon') c = e('path',{d:'M20.5 14.2A8 8 0 0 1 9.8 3.5 8.7 8.7 0 1 0 20.5 14.2Z'})
    if (n === 'home') c = [e('path',{key:1,d:'m3 11 9-8 9 8'}),e('path',{key:2,d:'M5 10v10h14V10'})]
    if (n === 'grid') c = [e('rect',{key:1,x:4,y:4,width:6,height:6,rx:1}),e('rect',{key:2,x:14,y:4,width:6,height:6,rx:1}),e('rect',{key:3,x:4,y:14,width:6,height:6,rx:1}),e('rect',{key:4,x:14,y:14,width:6,height:6,rx:1})]
    if (n === 'award') c = [e('circle',{key:1,cx:12,cy:9,r:5}),e('path',{key:2,d:'m9 14-1 7 4-2 4 2-1-7'})]
    if (n === 'briefcase') c = [e('rect',{key:1,x:3,y:7,width:18,height:13,rx:2}),e('path',{key:2,d:'M8 7V5h8v2'})]
    if (n === 'mail') c = [e('rect',{key:1,x:3,y:5,width:18,height:14,rx:2}),e('path',{key:2,d:'m4 7 8 6 8-6'})]
    if (n === 'user') c = [e('circle',{key:1,cx:12,cy:8,r:4}),e('path',{key:2,d:'M4 21a8 8 0 0 1 16 0'})]
    if (n === 'code') c = [e('path',{key:1,d:'m8 9-4 3 4 3'}),e('path',{key:2,d:'m16 9 4 3-4 3'}),e('path',{key:3,d:'m14 5-4 14'})]
    if (n === 'chevron') c = e('path',{d:'m9 6 6 6-6 6'})
    return e('svg',{width:s,height:s,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true},c)
  }

  var tech = {
    'Python':['#3776AB','Py'], 'React':['#149ECA','Re'], 'Node.js':['#5FA04E','JS'], 'FastAPI':['#009688','FA'],
    'PyTorch':['#EE4C2C','PT'], 'Firebase':['#F7A213','FB'], 'Google Cloud':['#4285F4','GC'], 'Docker':['#2496ED','DK'],
    'SAS Viya':['#1473E6','SAS'], 'Document AI':['#5F78E8','AI'], 'LLMs':['#7357D9','LLM'], '.NET':['#512BD4','.N'],
    'SQLite':['#0F80CC','DB'], 'Tailwind':['#06B6D4','TW'], 'scikit-learn':['#F89939','SK'], 'Pandas':['#150458','PD'],
    'SQL':['#336791','SQL'], 'KNIME':['#E7B800','KN'], 'Auth':['#7c3aed','AU'], 'Accessibility':['#ef4444','AX'], 'Tailwind':['#06B6D4','TW'], 'Git':['#F05032','GT'], 'Kubernetes':['#326CE5','K8'], 'MLOps':['#6B7280','ML'], 'OCR':['#2563EB','OCR'], 'Snowflake':['#29B5E8','SF'], 'WhatsApp':['#25D366','WA'], 'Hermes Agent':['#6B7CFF','HA'], 'Telegram':['#229ED9','TG'], 'Gmail IMAP':['#EA4335','GM'], 'DeepSeek':['#4D6BFE','DS']
  }

  function TechPill(props) {
    var t = tech[props.name] || ['#6f7782', props.name.slice(0,2)]
    return e('span',{className:'tech-pill'},e('i',{style:{background:t[0]}},t[1]),e('span',null,props.name))
  }

  class ThemeToggle extends React.Component {
    constructor(props){super(props);this.state={theme:document.documentElement.getAttribute('data-theme')||'dark'};this.toggle=this.toggle.bind(this)}
    toggle(){var next=this.state.theme==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('portfolio-theme',next)}catch(err){}this.setState({theme:next})}
    render(){return e('button',{className:'theme-toggle',onClick:this.toggle,'aria-label':'Toggle theme'},e(Icon,{name:this.state.theme==='dark'?'sun':'moon',size:16}))}
  }

  function Header(){return e('header',{className:'header'},e('div',{className:'shell header-inner'},
    e('a',{className:'brand',href:'#top'},data.profile.initials),
    e('nav',{className:'main-nav'},e('a',{href:'#about'},'About'),e('a',{href:'#skills'},'Skills'),e('a',{href:'#projects'},'Projects'),e('a',{href:'#experience'},'Experience'),e('a',{href:'#certifications'},'Certifications'),e('a',{href:'#competition'},'Recognition')),
    e('div',{className:'header-actions'},e(ThemeToggle),e('a',{className:'header-cta',href:'#contact'},'Let’s connect',e(Icon,{name:'arrow',size:14})))
  ))}

  function Hero(){return e('section',{className:'hero shell',id:'top'},
    e('div',{className:'hero-copy'},e('div',{className:'availability'},e('i'),data.profile.availability),e('p',{className:'eyebrow'},data.profile.eyebrow),
      e('h1',null,data.profile.headlineLead,e('span',null,data.profile.headlineAccent)),e('p',{className:'hero-intro'},data.profile.intro),
      e('div',{className:'hero-actions'},e('a',{className:'button button-primary',href:'#projects'},'View my work',e(Icon,{name:'arrow',size:15})),e('a',{className:'button button-secondary',href:data.profile.resume,download:'Kalvin_Chin_Resume.pdf'},e(Icon,{name:'download',size:15}),'Download Resume')),
      e('div',{className:'tech-summary'},e('p',null,'Technologies I work with'),e('div',{className:'tech-summary-row'},data.tech.slice(0,7).map(function(n){return e(TechPill,{key:n,name:n})})))
    ),
    e('div',{className:'hero-visual'},e('img',{src:'/assets/hero-workspace.jpg',alt:'Modern developer workspace'}),e('div',{className:'hero-quote'},'Good ideas. Better execution.'))
  )}

  function SectionHeading(props){return e('div',{className:'section-heading reveal'},e('div',null,e('p',{className:'eyebrow'},props.eyebrow),e('h2',null,props.title)),props.copy?e('p',{className:'section-copy'},props.copy):null)}

  function ProjectCard(props){var p=props.project;return e('article',{className:'project-card reveal'},e('div',{className:'project-image'},e('img',{src:p.image,alt:p.alt,loading:'lazy'}),e('span',{className:'project-number'},p.index)),e('div',{className:'project-body'},e('p',{className:'project-kicker'},p.title),e('div',{className:'project-title-row'},e('h3',null,p.subtitle)),e('p',{className:'project-description'},p.description),e('div',{className:'project-stack'},p.stack.map(function(n){return e(TechPill,{key:n,name:n})})),e('div',{className:'project-access'},e('span',null,'Access'),p.repo?e('a',{href:p.repo,target:'_blank',rel:'noreferrer'},p.access,e(Icon,{name:'arrow',size:12})):e('strong',null,p.access))))}

  function Projects(){return e('section',{className:'section shell',id:'projects'},e(SectionHeading,{eyebrow:'Selected work',title:'Things I’ve built',copy:'A small set of projects that show how I approach real problems across AI, software and cloud systems.'}),e('div',{className:'project-grid'},data.projects.map(function(p){return e(ProjectCard,{key:p.title,project:p})})))}

  function MiniTerminal(){return e('div',{className:'mini-terminal reveal'},e('div',{className:'terminal-bar'},e('div',{className:'traffic'},e('i'),e('i'),e('i')),e('span',null,'kalvin@portfolio ~ zsh')),e('div',{className:'terminal-content'},data.terminal.map(function(line,i){return e('div',{className:'terminal-line',key:i},e('p',null,e('span',{className:'prompt'},'kalvin@portfolio ~ % '),line.command),e('p',{className:'terminal-output'},'› ',line.output))}),e('p',null,e('span',{className:'prompt'},'kalvin@portfolio ~ % '),e('span',{className:'cursor'},'▍'))))}

  function About(){return e('section',{className:'section shell',id:'about'},e('div',{className:'about-grid'},e('div',{className:'about-copy reveal'},e('p',{className:'eyebrow'},'About'),e('h2',null,'I like building at the intersection of data and software.'),e('p',null,'I’m studying Applied AI & Analytics at Nanyang Polytechnic. I enjoy taking an idea from problem framing to a working product, then improving it through testing, feedback and iteration.'),e('p',null,'I’m especially interested in applied machine learning, cloud engineering, MLOps and developer tooling.'),e('a',{className:'text-link',href:data.profile.github,target:'_blank',rel:'noreferrer'},'See what I’m building on GitHub',e(Icon,{name:'arrow',size:14}))),e(MiniTerminal)))}

  function Skills(){return e('section',{className:'section shell',id:'skills'},
    e(SectionHeading,{eyebrow:'What poly taught me',title:'Skills I’ve built through coursework and projects',copy:'Not just tools I have touched, but capabilities I have practised through assignments, team projects and personal builds.'}),
    e('div',{className:'skill-grid'},data.polySkills.map(function(item){return e('article',{className:'skill-card reveal',key:item.index},
      e('div',{className:'skill-card-top'},e('span',{className:'skill-index'},item.index),e('h3',null,item.title)),
      e('p',{className:'skill-summary'},item.summary),
      e('div',{className:'skill-tags'},item.skills.map(function(n){return e(TechPill,{key:n,name:n})})),
      e('p',{className:'skill-detail'},item.detail)
    )}))
  )}

  function Experience(){return e('section',{className:'section shell',id:'experience'},e(SectionHeading,{eyebrow:'Experience',title:'Learning by shipping'}),e('div',{className:'timeline'},data.experience.map(function(item,i){return e('article',{className:'timeline-row reveal',key:i},e('span',{className:'timeline-period'},item.period),e('div',null,e('h3',null,item.title),e('p',{className:'timeline-org'},item.organisation),e('p',{className:'timeline-copy'},item.description)))})))}

  class Certifications extends React.Component {
    constructor(props){super(props);this.state={expanded:false};this.toggle=this.toggle.bind(this)}
    toggle(){this.setState({expanded:!this.state.expanded})}
    render(){var visible=this.state.expanded?data.certifications:data.certifications.slice(0,3);return e('section',{className:'section shell',id:'certifications'},
      e(SectionHeading,{eyebrow:'Certifications',title:'Credentials that support the work',copy:'The first three stay visible. Additional credentials can be expanded without turning the page into a badge wall.'}),
      e('div',{className:'cert-grid'},visible.map(function(c,i){return e('article',{className:'certificate-card reveal'+(c.placeholder?' is-placeholder':''),key:i},c.logo?e('div',{className:'certificate-logo'},e('img',{src:c.logo,alt:c.issuer+' logo',loading:'lazy'})):e('div',{className:'certificate-mark',style:{color:c.accent,borderColor:c.accent}},c.mark),e('div',{className:'certificate-main'},e('p',{className:'certificate-issuer'},c.issuer),e('h3',null,c.title),e('p',{className:'certificate-issued'},c.issued),e('p',{className:'certificate-meta'},c.credential)),c.href?e('a',{className:'certificate-status',href:c.href,target:'_blank',rel:'noreferrer'},c.status,e(Icon,{name:'arrow',size:12})):e('span',{className:'certificate-status'},c.status))})),
      e('div',{className:'cert-actions'},e('button',{className:'show-more',onClick:this.toggle},this.state.expanded?'Show fewer':'Show all certifications',e(Icon,{name:'chevron',size:15})))
    )}
  }

  class Competition extends React.Component {
    constructor(props){super(props);this.state={index:0};this.next=this.next.bind(this);this.prev=this.prev.bind(this);this.go=this.go.bind(this)}
    next(){this.setState({index:(this.state.index+1)%data.competition.images.length})}
    prev(){this.setState({index:(this.state.index-1+data.competition.images.length)%data.competition.images.length})}
    go(i){this.setState({index:i})}
    render(){var c=data.competition;var img=c.images[this.state.index];var self=this;return e('section',{className:'section shell',id:'competition'},
      e(SectionHeading,{eyebrow:'Competitions & recognition',title:'Moments that pushed me further',copy:'The Olympiad is the main story, with other academic and innovation milestones kept visible without turning the section into an awards wall.'}),
      e('div',{className:'competition-card reveal'},
        e('div',{className:'competition-media'},e('img',{src:img.src,alt:img.alt}),e('div',{className:'competition-overlay'}),e('div',{className:'competition-media-top'},e('span',null,c.year),e('span',null,(this.state.index+1)+' / '+c.images.length)),e('p',{className:'competition-caption'},img.caption),
          e('button',{className:'slider-btn slider-btn--left',onClick:this.prev,'aria-label':'Previous image'},'‹'),e('button',{className:'slider-btn slider-btn--right',onClick:this.next,'aria-label':'Next image'},'›'),
          e('div',{className:'slider-dots'},c.images.map(function(x,i){return e('button',{key:i,onClick:function(){self.go(i)},className:i===self.state.index?'is-active':'','aria-label':'Go to slide '+(i+1)})}))
        ),
        e('div',{className:'competition-copy'},e('p',{className:'eyebrow'},c.eyebrow),e('h3',null,c.title),e('p',{className:'competition-result'},c.result),e('blockquote',null,'“',c.reflection,'”'),e('p',{className:'competition-takeaway'},c.takeaway),e('div',{className:'reflection-label'},'Reflection · Kalvin'))
      ),
      e('div',{className:'recognition-heading reveal'},e('span',null,'Other recognition'),e('p',null,'A few other milestones from school, competitions and innovation work.')),
      e('div',{className:'recognition-grid'},data.recognitions.map(function(r,i){return e('article',{className:'recognition-card reveal'+(r.image?' has-image':''),key:i},r.image?e('div',{className:'recognition-thumb'},e('img',{src:r.image,alt:r.alt||r.title,loading:'lazy'})):null,e('div',{className:'recognition-main'},e('span',{className:'recognition-year'},r.year),e('h4',null,r.title),e('p',{className:'recognition-result'},r.result),e('p',{className:'recognition-description'},r.description)))}))
    )}
  }

  function Contact(){return e('section',{className:'contact shell',id:'contact'},e('div',{className:'contact-copy reveal'},e('p',{className:'eyebrow'},'Let’s talk'),e('h2',null,'Looking for a curious intern who likes building things?'),e('p',null,'I’m open to one-year internship opportunities where I can learn quickly, contribute to real systems and work with people who care about good engineering.')),e('div',{className:'contact-links reveal'},e('a',{href:'mailto:'+data.profile.email},e('span',null,'Email'),e('strong',null,data.profile.email),e(Icon,{name:'arrow',size:15})),e('a',{href:data.profile.linkedin,target:'_blank',rel:'noreferrer'},e('span',null,'LinkedIn'),e('strong',null,'Connect with me'),e(Icon,{name:'arrow',size:15})),e('a',{href:data.profile.github,target:'_blank',rel:'noreferrer'},e('span',null,'GitHub'),e('strong',null,'@K9lv1n'),e(Icon,{name:'arrow',size:15}))))}

  function Dock(){return e('nav',{className:'dock','aria-label':'Quick navigation'},e('a',{href:'#top'},e(Icon,{name:'home',size:18}),e('span',null,'Home')),e('a',{href:'#about'},e(Icon,{name:'user',size:18}),e('span',null,'About')),e('a',{href:'#skills'},e(Icon,{name:'code',size:18}),e('span',null,'Skills')),e('a',{href:'#projects'},e(Icon,{name:'grid',size:18}),e('span',null,'Projects')),e('a',{href:'#certifications'},e(Icon,{name:'award',size:18}),e('span',null,'Certs')),e('a',{href:'#contact'},e(Icon,{name:'mail',size:18}),e('span',null,'Contact')))}

  class ScrollTop extends React.Component {
    constructor(props){super(props);this.state={visible:false};this.onScroll=this.onScroll.bind(this);this.goTop=this.goTop.bind(this)}
    componentDidMount(){window.addEventListener('scroll',this.onScroll,{passive:true});this.onScroll()}
    componentWillUnmount(){window.removeEventListener('scroll',this.onScroll)}
    onScroll(){this.setState({visible:window.pageYOffset>520})}
    goTop(){window.scrollTo({top:0,behavior:'smooth'})}
    render(){return e('button',{className:'scroll-top'+(this.state.visible?' is-visible':''),onClick:this.goTop,'aria-label':'Back to top',title:'Back to top'},e('span',null,'↑'))}
  }

  function Footer(){return e('footer',{className:'shell footer'},e('span',null,'© 2026 ',data.profile.name),e('span',null,'Build · Learn · Iterate · Repeat'))}

  function App(){return e('div',{className:'site-page'},e(Header),e('main',null,e(Hero),e(About),e(Skills),e(Projects),e(Experience),e(Certifications),e(Competition),e(Contact)),e(Footer),e(Dock),e(ScrollTop))}

  ReactDOM.render(e(App),document.getElementById('root'))

  function initReveal(){var nodes=[].slice.call(document.querySelectorAll('.reveal'));if(!('IntersectionObserver'in window)){nodes.forEach(function(n){n.classList.add('is-visible')});return}var ob=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');ob.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -24px 0px'});nodes.forEach(function(n){ob.observe(n)})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initReveal);else initReveal()
})()
