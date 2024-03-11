# HearToStudy (cmd-f 2024)
A web app that listens for your notes, generates a summary, and turns them into flashcards for easy lesson plan review
Devpost [link](https://devpost.com/software/hear4you)

## Inspiration
We were inspired by UBC's Centre for Accessibility and their search for notetakers within certain courses. This role would be to assist those with learning disabilities who have trouble following along with professors in class lecture. We developed HearToStudy as a solution that promotes accessibility and inclusivity in education. Our goal was to leverage technology to create a platform that could transcribe lectures in real-time, summarize key points, and generate interactive flashcards for effective review.

## What it does
You have the option to either copy-paste your lecture notes or transcribe a lecture with the built-in voice dictation tool of your device. After clicking, "Generate Summary" you are taken to a page that contains a summary of your notes. Then, by clicking "Generate Flashcards", you will have an option to select how any flashcards you want to make. The app will display a set of flashcards based on the number you specify.

## How we built it
Leveraging Flask's simplicity and flexibility, we created RESTful APIs in Python, while Next.js provided a dynamic user interface with server-side rendering. The Cohere API's `/summarize` endpoint helps us generate the summary while the `/chat` endpoint extracts important terms for flashcards.

## Challenges we ran into
The time constraint was stressful while learning new technologies like Flask and Next.js, which posed significant challenges. Integrating the Cohere API for the first time added complexity to the project's development.

## Accomplishments that we're proud of
We successfully integrated Cohere API and developed a functional platform that promotes inclusive learning.

## What we learned
We gained insights into accessibility needs in education and honed our skills in API integration and UI development.

## What's next for HearToStudy
We would like to improve the dictation feature to use a better API that captures continuous audio input more easily. We would also like to expand the flashcard feature to develop other quiz-type options, such as Multiple Choice or True/False questions. We would also like to give users the ability to edit the summary and edit the flashcards themselves, perhaps with the markdown/text edit API of TinyMCE.
