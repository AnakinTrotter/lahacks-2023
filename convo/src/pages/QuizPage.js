import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quiz from '@/components/Quiz';

const QuizPage = () => {
  return (
    <Container fluid style ={{maxHeight:'100vh', overflowY: 'scroll'}}>
    <div className="row" style ={{borderBottom: '2px solid black', position:'absolute', backgroundColor:'white', height:'10vh', width:'100%'}}>
                <h1>Convo</h1>
                
    </div>
    <div className="row align-items-start">
        <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
            <div style={{margin:'20px'}}>
            In today’s idea-driven economy, the cost of time is what really matters. With the constant pressure to innovate, it makes little sense to waste countless collective hours commuting. So, the most efficient and productive regions are those in which people are thinking and working—not sitting in traffic. The auto-dependent transportation system has reached its limit in most major cities and megaregions. Commuting by car is among the least efficient of all our activities—not to mention among the least enjoyable, according to detailed research by the Nobel Prize–winning economist Daniel Kahneman and his colleagues. 

Though one might think that the economic crisis beginning in 2007 would have reduced traffic (high unemployment means fewer workers traveling to and from work), the opposite has been true. Average commutes have lengthened, and congestion has gotten worse, if anything. The average commute rose in 2008 to 25.5 minutes, “erasing years of decreases to stand at the level of 2000, as people had to leave home earlier in the morning to pick up friends for their ride to work or to catch a bus or subway train,” according to the U.S. Census Bureau, which collects the figures.

And those are average figures. Commutes are far longer in the big West Coast cities of Los Angeles and San Francisco and the East Coast cities of New York, Philadelphia, Baltimore, and Washington, D.C. In many of these cities, gridlock has become the norm, not just at rush hour but all day, every day. The costs are astounding. In Los Angeles, congestion eats up more than 485 million working hours a year; that’s seventy hours, or nearly two weeks, of full-time work per commuter. In D.C., the time cost of congestion is sixty-two hours per worker per year. In New York it’s forty-four hours. Average it out, and the time cost across America’s thirteen biggest city regions is fifty-one hours per worker per year. Across the country, commuting wastes 4.2 billion hours of work time annually—nearly a full workweek for every commuter.

The overall cost to the U.S. economy is nearly $90 billion when lost productivity and wasted fuel are taken into account. At the Martin Prosperity Institute, we calculate that every minute shaved off America’s commuting time is worth $19.5 billion in value added to the economy. The numbers add up fast: five minutes is worth $97.7 billion; ten minutes, $195 billion; fifteen minutes, $292 billion.
            </div>
        </div>

        <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
            <Quiz/>
        </div>
    </div>
    </Container>
  )
}

export default QuizPage