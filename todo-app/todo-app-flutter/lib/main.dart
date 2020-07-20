import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'graphQLdata.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    GraphQLProvider(
      client: gqlObject.client,
      child: CacheProvider(
        child: MaterialApp(
          home: Home(),
        ),
      ),
    ),
  );
}

class GraphQLObject {
  // change the uri below to the DGRAPH_INSTANCE address
  static HttpLink httpLink = HttpLink(
    uri: 'http://192.168.0.101:8080/graphql',
  );
  static AuthLink authLink = AuthLink();
  static Link link = httpLink as Link;
  ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      cache: InMemoryCache(),
      link: link,
    ),
  );
}

GraphQLObject gqlObject = new GraphQLObject();
final GlobalKey<ScaffoldState> _scaffoldkey = new GlobalKey<ScaffoldState>();
String _visibility = 'All';
List<dynamic> _tasks = [];

void showSnackBar(textValue) {
  _scaffoldkey.currentState.hideCurrentSnackBar();
  final snackBarContent = SnackBar(
    content: Text(textValue),
    duration: Duration(seconds: 1),
  );
  _scaffoldkey.currentState.showSnackBar(snackBarContent);
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldkey,
      appBar: AppBar(
        title: Text(
            "Todos",
            style: TextStyle(
              fontSize: 30.0,
              fontWeight: FontWeight.bold,
            ),
        ),
        centerTitle: true,
        backgroundColor: new Color.fromRGBO(177, 45, 43, 1.0),
      ),
      body: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Mutation(
                options: MutationOptions(
                  document: toggleAllTask(), // mutation to toggle tasks
                ),
                builder: (
                    RunMutation runMutation,
                    QueryResult result,
                ) {
                  if (result.hasErrors) {
                    print("Toggle All Error: ${result.errors.toString()}");
                  }
                  return FlatButton(
                    child: Row(
                      children: <Widget>[
                        Icon(Icons.keyboard_arrow_down),
                        Text("Toggle Tasks",
                          style: TextStyle(
                              fontSize: 13.0
                          ),
                        ),
                      ],
                    ),
                    // toggle all tasks when the button is pressed
                    onPressed: () {
                      // calculate number of tasks which are not completed yet
                      int remainingTasks = _tasks.where((task) => task['completed'] == true).length;
                      // if all tasks are already completed, toggle all to false else true
                      bool toggleValue = remainingTasks == _tasks.length ? false:true;
                      runMutation({
                        'completed': toggleValue
                      });
                      // toggling the tasks, display a snackbar.
                      showSnackBar('Toggling the tasks');
                    },
                  );
                }
              ),
              DropDownButton(),
              Mutation(
                options: MutationOptions(
                document: clearCompletedTask(), // mutation to clear completed tasks
              ),
                builder: (
                  RunMutation runMutation,
                  QueryResult result,
                ) {
                  if (result.hasErrors) {
                    print("Clearing Tasks Error: ${result.errors.toString()}");
                  }
                  return FlatButton(
                    child: Text(
                      "Clear completed tasks",
                      style: TextStyle(
                          fontSize: 13.0
                      ),
                    ),
                    onPressed: () {
                      runMutation({
                        'completed': true
                      });
                      // Toggling the tasks, display a snackbar.
                      showSnackBar('Clearing completed tasks');
                    },
                  );
                }
              ),
            ],
          ),
          Divider(
            color: Colors.black38,
            thickness: 0.5,
          ),
          TodoList(),
          Padding(
            padding: EdgeInsets.all(20.0),
            child: Text(
              "Created by Dgraph.io",
              style: TextStyle(
                color: Colors.black38,
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        // When the user presses the button, show an alert dialog containing
        // the text that the user has entered into the text field.
        onPressed: () {
          return showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text("Add a Task"),
                // Open the Add form by using the TextEditingController.
                content: AddTaskForm(),
              );
            },
          );
        },
        tooltip: 'Add a task!',
      ),
    );
  }
}

class DropDownButton extends StatefulWidget {
  @override
  DropDownState createState() => DropDownState();
}

class DropDownState extends State<DropDownButton> {
  @override
  Widget build(BuildContext context) {
    // DropdownButton to change the visibility
    return new DropdownButton<String>(
      value: _visibility,
      icon: Icon(Icons.arrow_drop_down),
      iconSize: 24,
      elevation: 16,
      style: TextStyle(
          color: Colors.deepPurple
      ),
      underline: Container(
        height: 2,
        color: Colors.deepPurpleAccent,
      ),
      onChanged: (String newValue) {
        setState(() {
          _visibility = newValue;
        });
      },
      items: ['All', 'Active', 'Completed']
          .map((value) {
        return DropdownMenuItem(
          value: value,
          child: Text(value,
            style: TextStyle(
                fontSize: 13.0
            ),
          ),
        );
      })
          .toList(),
    );
  }
}

class AddTaskForm extends StatefulWidget {
  @override
  AddTaskFormState createState() {
    return AddTaskFormState();
  }
}

class AddTaskFormState extends State<AddTaskForm> {
  final _formKey = GlobalKey<FormState>();
  // Create a text controller. Later, use it to retrieve the
  // current value of the TextField.
  final textController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return new Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          // Add TextFormFields and RaisedButton here.
          TextFormField(
            controller: textController,
            decoration: const InputDecoration(
              icon: Icon(Icons.note_add),
              hintText: 'What needs to be done?',
              labelText: 'Task Name',
            ),
            // The validator receives the text that the user has entered.
            validator: (value) {
              if (value.isEmpty) {
                return "Please enter your task";
              }
              return null;
            },
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 10.0),
              child: Mutation(
                options: MutationOptions(
                document: addTask(), // mutation to create a new task
              ),
              builder: (
                RunMutation runMutation,
                QueryResult result,
                ) {
                  if (result.hasErrors) {
                    print("Mutation Error: ${result.errors.toString()}");
                  }  else if (result.data != null) {
                    print("Mutation Success: ${result.data["addTask"]}");
                  }
                  return RaisedButton(
                    child: Text('Add'),
                    onPressed: () {
                      // validate returns true if the form is valid, otherwise false.
                      if (_formKey.currentState.validate()) {
                        final task = {
                          'title': textController.text,
                          'completed': false,
                        };
                        runMutation({
                          'task': [task],
                        });
                        _tasks.add(task);
                        textController.clear();
                        // if the task is being added, display a snackbar.
                        showSnackBar('Adding the task to database');
                        Navigator.of(context).pop(true);
                      }
                    },
                  );
                }
              )
            )
          )
        ]
      ),
    );
  }
}

class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {

  final _editFormKey = GlobalKey<FormState>();
  final popUpTextController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    popUpTextController.dispose();
    super.dispose();
  }

  Widget getListWidgets(List<dynamic> tasks) {
    return new ListView(
        children: tasks.map((task) =>
        new Mutation(
          options: MutationOptions(
            document: updateTask(), // this is the mutation string you just created
          ),
          builder: (
            RunMutation runMutation,
            QueryResult result,
          ) {
            if (result.errors != null) {
              print('Edit Error: ${result.errors.toString()}');
            }
            return InkWell(
              onDoubleTap: () {
                popUpTextController.text = task['title'];
                // Open Edit Task Dialog
                showDialog(
                  barrierDismissible: true,
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: Text("Edit a Task"),
                      // creating edit task form
                      content: new Form(
                        key: _editFormKey,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            TextFormField(
                              controller: popUpTextController,
                              decoration: const InputDecoration(
                                icon: Icon(Icons.edit),
                                hintText: 'Enter the updated task',
                                labelText: 'Task Name',
                              ),
                              validator: (String value) {
                                if (value.isEmpty) {
                                  return "Please enter your updated task";
                                }
                                return null;
                              },
                            ),
                          ],
                        ),
                      ),
                      actions: <Widget>[
                        FlatButton(
                          child: Text('OK'),
                          onPressed: () {
                            if (_editFormKey.currentState.validate()) {
                              runMutation({
                                'taskID': task['id'],
                                'task': {
                                  'title': popUpTextController.text,
                                }
                              });
                              popUpTextController.clear();
                              showSnackBar('Updated the task');
                              Navigator.of(context).pop(true);
                            }
                          },
                        ),
                        FlatButton(
                          child: Text('Cancel'),
                          onPressed: () {
                            popUpTextController.clear();
                            Navigator.of(context).pop(false);
                          },
                        )
                      ],
                    );
                  },
                );
              },
              // creating list tiles with all tasks
              child: ListTile(
                key: Key(task['id']),
                title: Text(
                  task['title'],
                  style: TextStyle(
                      fontSize: 16.0,
                      // setting line through decoration when task is completed
                      decoration: task['completed'] ? TextDecoration.lineThrough : TextDecoration.none,
                  ),
                ),
                leading: new Mutation(
                  options: MutationOptions(
                    document: toggleTask(), // this is the mutation string you just created
                  ),
                  builder: (
                      RunMutation runMutation,
                      QueryResult result,
                  ) {
                    if (result.errors != null) {
                      print('Toggle Error: ${result.errors.toString()}');
                    }
                    return new InkWell(
                        onTap: () {
                          runMutation({
                            'taskID': task['id'],
                            'completed': !task['completed'],
                          });
                          task['completed'] = !task['completed'];
                          // when toggling, display a snackbar.
                          showSnackBar('Marking task as '
                            '${task['completed']
                            ? 'completed'
                            : 'uncompleted'}'
                          );
                        },
                        child: Padding(
                            padding: const EdgeInsets.all(0.0),
                            child: Icon(
                                task['completed'] ? Icons.check_box : Icons
                                    .check_box_outline_blank)
                        )
                    );
                  },
                ),
                trailing: new Mutation(
                  options: MutationOptions(
                    document: deleteTask(), // this is the mutation string you just created
                  ),
                  builder: (RunMutation runMutation,
                    QueryResult result,) {
                    if (result.hasErrors) {
                      print('Delete Error: ${result.errors.toString()}');
                    }
                    return new InkWell(
                      onTap: () {
                        runMutation({
                          'taskID': [task['id']]
                        });
                        _tasks.remove(task);
                        // when deleting, display a snackbar.
                        showSnackBar('Deleting task');
                      },
                      child: Container(
                        child: Icon(Icons.delete),
                        height: double.infinity,
                        width: 25.0,
                      )
                    );
                  },
                ),
              ),
            );
          }
        ),
      ).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Query(
        options: QueryOptions(
          document: fetchAll(),
          pollInterval: 1,
        ),
        builder: (QueryResult result, { VoidCallback refetch, FetchMore fetchMore }) {
          if (result.hasErrors) {
            print('query errors: ${result.errors}');
            return Text('Error listing tasks: ${result.errors.toString()}',
              style: Theme
                  .of(context)
                  .textTheme
                  .display1,);
          } else if (result.data == null || result.loading) {
            return Text('Loading...',
              style: Theme
                .of(context)
                .textTheme
                .display1,
            );
          }
          // show Empty when there is no task
          if (result.data['queryTask'].length == 0) {
            return Text(
              'Empty',
              style: Theme
                  .of(context)
                  .textTheme
                  .display1,
            );
          }
          List<dynamic> tasks = result.data['queryTask'];
          // filter tasks based on the visibility
          if (_visibility != 'All') {
            final bool visible = (_visibility == 'Active' ? false : true);
            _tasks = tasks.where((task) => task['completed'] == visible).toList();
          } else {
            _tasks = tasks;
          }
          return getListWidgets(_tasks);
        }
      )
    );
  }
}
