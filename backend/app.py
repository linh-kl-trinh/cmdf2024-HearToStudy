from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import json

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def index():
#     text="Judging:\n\
#     The Redbrick team will receive all the DevPost submissions and review them for the\
#     accessibility analysis conducted. The submissions will be shortlisted down to ~8 projects, and\
#     then the Redbrick judges will go around and receive presentations and ask questions to help\
#     them make their final decision.\n\
#     Prize:\n\
#     Each member will receive a prize pack with a $150 gift card to Patagonia, Redbrick branded\
#     Lululemon belt bag ($75 value), Redbrick swag and other goodies. PLUS a guaranteed coffee\
#     chat with our head of recruitment!\n\
#     Qualification Criteria:\n\
#     Your submission/presentation must consider accessibility and inclusive design principles. You\
#     must provide an accessibility analysis with your submission, an explanation of your use of\
#     inclusive design principles, and be able to demonstrate how your project adheres to these\
#     principles.\n\
#     Ideas and Resources:\n\
#     We don’t always think about the accessibility and inclusion of the software that we build. Below\
#     are some tools to learn more about inclusive design principles, accessibility, and tools to\
#     analyze your project’s accessibility\n"
#     save_to_json('original.json', {'content': text})
#     generate_notes(text)
#     generate_quiz(10)
#     return 'Hello, World!'

def save_to_json(file_path, data):
    try:
        with open(file_path, 'w') as json_file:
            json.dump(data, json_file, indent=2)
            json_file.write('\n')  # Add a newline to separate appended JSON objects
        print(f'Data saved to {file_path} successfully.')
    except Exception as e:
        print(f'Error appending data to {file_path}: {e}')


def read_from_json(file_path, key):
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            if key in data:
                return data[key]
            else:
                print(f'Key "{key}" not found in {file_path}')
    except FileNotFoundError:
        print(f'File not found: {file_path}')
    except json.JSONDecodeError as e:
        print(f'Error decoding JSON in {file_path}: {e}')
    except Exception as e:
        print(f'Error reading data from {file_path}: {e}')

def generate_notes(text):
    print(text)
    # save_to_json('original.json', {'content': text})
    co = cohere.Client()
    
    response = co.summarize(
        text=text,
        format="bullets",
    )

    print(response.summary)

    save_to_json('summary.json', {'content': response.summary})

    return response.summary
    
@app.route('/sendText', methods=['POST'])
def send_text():
    try:
        text = request.get_json()
        
        return jsonify({
            'notes': generate_notes(text)
        })

    except Exception as e:
        print(f'Error: {str(e)}')
        return {'error': 'Failed to process the text'}, 500
    
@app.route('/getQuiz', methods=['GET'])
def generate_quiz():
    try:
        co = cohere.Client()
        response = co.chat(
            chat_history=[
                # {"role": "USER", "message": read_from_json('original.json', 'content')},
                {"role": "USER", "message": read_from_json('summary.json', 'content')},
            ],
            message=f"Make 10 flashcards of key concepts \
                and their corresponding key ideas/definitions for the text above. \
                    Format as a json array of objects with 2 fields: 'front' and 'back', the value of 'front' \
                    is the concept and the backside as the value. Make sure the frontside only \
                            contains the concept.")
        
        # print(response.text)

        flashcards = response.text

        # Find the index of '['
        start_index = flashcards.find('[')
        end_index = flashcards.find(']')

        if start_index != -1:
            # Extract everything from '[' onwards
            result = flashcards[start_index:end_index+1]
            # print(result)
        else:
            return None

        save_to_json('flashcards.json', {'content': result})

        return jsonify({
            'flashcards': result
        })
    
    except Exception as e:
        print(f'Error: {str(e)}')
        return {'error': 'Failed to generate quiz'}, 500

@app.route('/getSummary', methods=['GET'])
def get_summary():
    data = read_from_json('summary.json', 'content')
    return jsonify({
        'content': data
    })

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
