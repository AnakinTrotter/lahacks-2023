import { Configuration, OpenAIApi } from "openai";

const chatPrompt = (input) => {
    return `
    For a given passage, please create 2 multiple-choice reading comprehension questions. Make sure each question has one distinct correct answer, and three distinct wrong answers. The correct answer should be taken directly from the passage. 

    Below is an example of a passage you should create multiple-choice quiz questions for:
    In today’s idea-driven economy, the cost of time is what  really matters. With the constant pressure to innovate, it  makes little sense to waste countless collective hours  commuting. So, the most efficient and productive regions are those in which people are thinking and working—not sitting  in traffic. The auto-dependent transportation system has reached its limit in most major cities and megaregions. Commuting by  car is among the least efficient of all our activities—not to  mention among the least enjoyable, according to detailed  research by the Nobel Prize–winning economist Daniel Kahneman and his colleagues. Though one might think that  the economic crisis beginning in 2007 would have reduced  traffic (high unemployment means fewer workers traveling to  and from work), the opposite has been true. Average  commutes have lengthened, and congestion has gotten worse,  if anything. The average commute rose in 2008 to  25.5 minutes, “erasing years of decreases to stand at the level  of 2000, as people had to leave home earlier in the morning to  pick up friends for their ride to work or to catch a bus or subway train,” according to the U.S. Census Bureau, which  collects the figures. And those are average figures. Commutes  are far longer in the big West Coast cities of Los Angeles and  San Francisco and the East Coast cities of New York,  Philadelphia, Baltimore, and Washington, D.C. In many of  these cities, gridlock has become the norm, not just at rush  hour but all day, every day. The costs are astounding. In Los Angeles, congestion eats  up more than 485 million working hours a year; that’s seventy hours, or nearly two weeks, of full-time work per commuter.  In D.C., the time cost of congestion is sixty-two hours per  worker per year. In New York it’s forty-four hours. Average it  out, and the time cost across America’s thirteen biggest city  regions is fifty-one hours per worker per year. Across the  country, commuting wastes 4.2 billion hours of work time annually—nearly a full workweek for every commuter. The  overall cost to the U.S. economy is nearly $90 billion when lost productivity and wasted fuel are taken into account. At the  Martin Prosperity Institute, we calculate that every minute  shaved off America’s commuting time is worth $19.5 billion in value added to the economy. The numbers add up fast: five  minutes is worth $97.7 billion; ten minutes, $195 billion;  fifteen minutes, $292 billion. It’s ironic that so many people still believe the main  remedy for traffic congestion is to build more roads and  highways, which of course only makes the problem worse.  New roads generate higher levels of “induced traffic,” that is,  new roads just invite drivers to drive more and lure people  who take mass transit back to their cars. Eventually, we end up  with more clogged roads rather than a long-term  improvement in traffic flow. The coming decades will likely see more intense clustering  of jobs, innovation, and productivity in a smaller number of bigger cities and city-regions. Some regions could end up  bloated beyond the capacity of their infrastructure, while  others struggle, their promise stymied by inadequate human  or other resources.
    
    Please output the questions as a json object with a question parameter which stores a question as a string and an an answers array which contains all the options as strings.
    
    An example of a output you generate for the example passage may be:
    {
          question: "The passage most strongly suggests that researchers at the Martin Prosperity Institute share which assumption?",
          answers: [
            { "Employees who work from home are more valuable to their employers than employees who commute.", isCorrect: false },
            { " Employees whose commutes are shortened will use the time saved to do additional productive work for their employers.", isCorrect: true },
            {" Employees can conduct business activities, such as composing memos or joining conference calls, while commuting.", isCorrect: false },
            { " Employees who have longer commutes tend to make more money than employees who have shorter commutes.", isCorrect: false }
          ]
    },
    
    
    Now, please generate 2 quiz questions for the passage below:
    
    ${input}`

}

export default async function handler(req, res) {
  console.log("pog")
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chatPrompt(req.body.paragraph),
    max_tokens: 2048
  });

  console.log(completion.data.choices)

  const ans = completion.data.choices[0].text

  res.status(200).json(ans);
}