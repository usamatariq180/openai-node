import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0,
      max_tokens: 1036,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,

    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Answer the question based on the context below. Keep the answer short and concise. Respond 'Unsure about answer' if not sure about the answer. 
  Context: DevOps is a software development approach that aims to streamline the development and delivery of software by integrating the development and operations teams. DevOps teams work together to automate the software development process, including building, testing, deploying, and monitoring applications.
  The DevOps approach is based on the principles of collaboration, automation, and continuous delivery. Collaboration involves bringing together the development and operations teams to work together throughout the software development process. Automation refers to the use of tools and processes to automate the software development process, including testing and deployment. Continuous delivery involves continuously delivering new features and updates to software, ensuring that the software is always up-to-date and meets the needs of users.
  DevOps provides several benefits to software development teams, including faster time-to-market, improved software quality, and increased collaboration between teams. 
  Here are some of the key components of DevOps:
  Continuous Integration (CI): Continuous Integration involves the continuous merging and testing of code changes as they are made by developers. This allows the development team to quickly identify and fix any issues that arise, ensuring that the code is always up-to-date and stable.
  Continuous Delivery (CD): Continuous Delivery involves the automated delivery of software updates and new features to users. This ensures that the software is always up-to-date and meets the needs of users.
  Infrastructure as Code (IaC): Infrastructure as Code involves managing infrastructure resources (such as servers and databases) using code. This allows developers to quickly and easily deploy new infrastructure resources, and to make changes to existing resources as needed.
  Monitoring and Logging: Monitoring and Logging involves monitoring the performance of software applications and logging any errors or issues that arise. This allows the development team to quickly identify and fix any issues that arise, ensuring that the software is always up-to-date and stable.
  Agile Development: Agile Development is a software development methodology that involves working in short sprints and continuously delivering new features and updates to users. This allows the development team to quickly respond to changing user needs and to deliver high-quality software.
  In order to implement DevOps successfully, it is important to have a strong organizational culture that supports collaboration, automation, and continuous delivery. This involves creating a culture of trust, transparency, and communication between the development and operations teams. It also involves investing in the right tools and processes to support automation and continuous delivery.
  Some of the key tools and technologies used in DevOps include:
  Source Control Management (SCM) tools, such as Git and SVN, which allow developers to manage and version control their code.
  Continuous Integration and Continuous Delivery (CI/CD) tools, such as Jenkins and Travis CI, which automate the software development process and enable continuous delivery.
  Containerization tools, such as Docker and Kubernetes, which allow for easy deployment and scaling of software applications.
  Infrastructure as Code (IaC) tools, such as Terraform and Ansible, which allow developers to manage infrastructure resources using code.
  Monitoring and Logging tools, such as Nagios and ELK Stack, which enable developers to monitor the performance of their applications and log any errors or issues that arise.
  In conclusion, DevOps is a software development approach that aims to streamline the development and delivery of software by integrating the development and operations teams. DevOps provides several benefits to software development teams, including faster time-to-market, improved software quality, and increased collaboration between teams. To implement DevOps successfully, it is important to have a strong organizational culture that supports collaboration, automation, and continuous delivery, and to invest in the right tools and processes to support these principles.
  DevOps Tools:
  There are a wide variety of tools available for DevOps teams. These tools can help automate various stages of the software development process, from source control management to deployment and monitoring. Some popular tools used in DevOps include:
  Source Control Management (SCM) Tools: SCM tools, such as Git and SVN, allow teams to manage and version control their code, collaborate on changes, and maintain a history of all code changes.
  Continuous Integration (CI) Tools: CI tools, such as Jenkins and CircleCI, automate the process of building, testing, and merging code changes, helping to ensure that code is always stable and ready for deployment.
  Continuous Delivery (CD) Tools: CD tools, such as Ansible and Puppet, automate the process of deploying code changes to production environments, helping to ensure that changes are delivered quickly and reliably.
  Containerization Tools: Containerization tools, such as Docker and Kubernetes, enable developers to package their applications and dependencies into portable containers that can be deployed quickly and easily.
  Monitoring and Logging Tools: Monitoring and logging tools, such as Nagios and ELK Stack, help teams monitor the health and performance of their applications, and identify and diagnose issues quickly.
  DevOps Techniques:
  In addition to tools, there are a number of DevOps techniques that teams can use to improve their software development processes. Some popular techniques include:
  Infrastructure as Code (IaC): IaC involves managing infrastructure resources (such as servers and databases) using code. This helps teams to quickly and easily deploy new infrastructure resources, and to make changes to existing resources as needed.
  Automated Testing: Automated testing helps teams to catch and fix issues early in the development process, reducing the risk of bugs and errors in production.
  Continuous Improvement: DevOps teams are constantly looking for ways to improve their processes and tools, with a focus on delivering higher-quality software more quickly.
  Agile Development: Agile development is a software development methodology that emphasizes flexibility, collaboration, and continuous delivery. DevOps teams often use agile practices to help them deliver software quickly and reliably.
  DevOps Practices:
  Finally, there are a number of DevOps practices that teams can adopt to improve their software development processes. Some popular practices include:
  Collaboration: DevOps emphasizes collaboration between development and operations teams, to ensure that everyone is working together to deliver software quickly and reliably.
  Automation: Automation is a key practice in DevOps, helping teams to automate many of the repetitive and error-prone tasks involved in software development and deployment.
  Continuous Delivery: Continuous delivery is a practice that involves delivering new features and updates to users on a regular basis, helping to ensure that software is always up-to-date and meets the needs of users.
  Infrastructure as Code: As mentioned above, IaC is a practice that involves managing infrastructure resources using code, helping teams to quickly and easily deploy new resources and make changes as needed.
  In conclusion, DevOps is a software development approach that emphasizes collaboration, automation, and continuous delivery. To achieve these goals, DevOps teams use a variety of tools, techniques, and practices. By adopting DevOps practices and using DevOps tools and techniques, organizations can deliver higher-quality software more quickly and reliably, and gain a competitive advantage in their market.
  
  Q: What are the 7 C's of DevOps?\n
  A: 7Cs of DevOps Continuous (Planning, Development, Integration, Deployment, Testing, Delivery & Monitoring, and Feedback). We believe in the agile mantra “People over Process over Tools”.\n\n

  Q:${capitalizedAnimal} \n
  A:`;

}
