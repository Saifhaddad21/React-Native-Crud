// import { Text , View , TextInput , Pressable , StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useState } from 'react';

// // import { data } from "@/app/data/todos";
// import { data } from "../data/todos";


// export default function Index() {
//   const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
//   const [text, setText] = useState('');

//   const addTodo = () => {
//     if (text.trim()) {
//       const newId = todos.length > 0 ? todos[0].id + 1 : 1;
//       setTodos([{id : newId, title: text, completed: false}, ...todos]);
//       setText('');
//     }
//   }

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ))
//   }

//   const removeTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   }   


//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add a new todo"
//           placeholderTextColor="gray"
//           // value={text}
//           value={text}
//           onChangeText={setText}
//         />
//           <Pressable onPress={addTodo} style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add</Text>
//           </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//     width: '100%',
//     backgroundColor: 'black',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     padding: 10,
//     width: '100%',
//     maxWidth: 1024,
//     marginHorizontal: 'auto',
//     pointerEvents: 'auto',
//   }
// });


import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { data } from "../data/todos";
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles..todoItem}>
      <Text style={[styles.todoText, item.completed && styles.completedText ]}
      onPress={() => toggleTodo(item.id)}
        >
          {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" 
        selectable={undefined} 
        />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginRight: 10,
    fontSize: 16,
    minWidth: 0,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    // marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
    // backgroundColor: 'gray',
    padding: 10,
    // marginVertical: 5,
    // borderRadius: 5,
  },
  todoText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
