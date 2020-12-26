# Introduction

**A framework for creating adaptive Internet-Delivered Psychological Treatment (IDPT) Systems**

Internet-Delivered Psychological Treatment (IDPT) systems refer to any software applications that facilitate interaction with psychological therapy through the Internet. These mainly include web-applications, mobile applications, augmented reality, and virtual reality applications.

IDPT has surfaced and grown as one of the most commonly practiced and widely researched forms of psychotherapy. The evolution of IDPT, coupled with the exponential growth of Internet access throughout the world, has the potential to reshape the landscape of mental healthcare. Despite evolution in IDPT, several patients suffering from mental health issues go untreated. Obstacles to receiving treatment for mental health problems include long waiting lists, limited access to psychiatric medications, perceived stigma of seeking help, and treatment costs. IDPT systems have been proposed as one solution to bridge this treatment gap. IDPT removes several barriers over traditional face-to-face therapy that hinders the majority of patients from efficient psychiatric care. The use of IDPT tools can enhance patient health in several ways: 1) IDPT can be available and accessible from anywhere with an Internet connection; 2) the temporal aspects of access can be substantially improved; 3) the scalability of IDPT can drastically enhance the functional capacity of the care; 4) makes the treatment cost-effective for individuals who do not have insurance or can not afford the out-of-pocket fees for treatment, and 5) removes the discomfort and the stigma related issues associated with the face-to-face approaches.

## Components of IDPT

Figure 2 depicts a conceptual model of IDPT. A typical IDPT contains several components:

### Cases

Typically, IDPT includes one or more cases such as Depression, Social Anxiety, Bipolar Disorder, ADHD, and other mental health issues [25].

### Modules

Each case contains one to many modules that focus on any particular dimension of the case. For example, for depression, there can be a module for sleeping issues, concentration issues, speaking issues, and others. One module can belong to one or many cases. The modules can have dependencies.

### Tasks

Each module, in turn, includes one to many tasks and have constraints as the prerequisites. Examples of such constraints include task dependencies, task availability, publication date, and others. Each task contributes to collecting passive (informative) or active (interactive) data in the system. Informative tasks provide learning materials about the mental health issue (case), symptoms, use cases, and several ways to manage them. The main objective of such educational materials is to provide psycho-education so that a) patients and their families can learn about symptoms, causes, and treatment concepts; b) patients can comprehend self-help program and steps required to manage their illness; c) patients can correlate their situations with similar others which helps to ventilate their frustrations. Such educational materials are in the form of reading tasks (text), listening (audio), and watching (video). In contrast to informative tasks, interactive tasks involve user interactions and often in the form of exercises. The exercises can be physical activities or computerized tasks. Examples of activities include physical workouts and mindfulness exercises such as breathing exercises, walking certain distances, stretching, or physically performing any other activities. Examples of the computerized exercises involve fill in the blanks, question answering (Q/A), multiple-choice questions (MCQ), and feedback. The feedback type of task consists of using free text, rating systems, or multiple-choice questions.

# Demo

[Check online Demo](https://idpt.herokuapp.com/)

```
username:  admin@idpt.no
password: 123456
```

# Getting started (Development)

For getting started with development follow the [wiki page documention](https://github.com/sureshHARDIYA/idpt/wiki).

# Features

- Create Cases
- Create Modules
- Create Tasks
- Create Users with roles
- Create Task builders
- Patient view
- Assignments management for Tasks
- Create and assign taxonomy for each entities (Case, Model, Tasks)

# Roadmaps

- User profiling techniques
- Integrate Dashboard for Users
- Integrate Dashboard for Therapists
- Integrate IoT devices
- Exchange of messages based on HL7 FHIR

# What can I use this application for?

We envision to create IDPT system that enhances user interaction and increases user adherence. To do so, we rely on building comprehensive user profiling. This prototype is an early stage of what we envision. However, we made this project open-source to increase user support in development, testing, and extension. This open-source framework can be used for creating any healthcare interventions. We envision that we can get enough support from both industry and academic partners to modularize this project as an aggregation of plugins.

# Tags

ICBT, Cognitive Behvaioral Therapy, Internet Intervent, Web application for online interventions

# Contribution

We welcome your contribution in any form, as small as it can be. For contributing anything, create a PR and we will be happy to review within a few working days. If you have any question, feel free to shoot an email [skmu@hvl.no](skmu@hvl.no)

# Contributors

| <img src="https://cdn.rawgit.com/sureshHARDIYA/portfolio/e2f31a2a/assets/vendor/browserstack.svg" width="250" height="70"/> | Big thanks to BrowserStack for providing cross-browser testing to Open Source projects! |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| <img src="https://intromat.no/wp-content/uploads/2016/08/logo-x1.png" width="250" height="70" />                            | For creating environment for working on IDPT system open-source framework.              |

# MIT License

[Read more](/LICENSE)
