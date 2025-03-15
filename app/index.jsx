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
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useRouter } from 'expo-router';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons/Octicons';

import { data } from "../data/todos";
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { create } from 'react-test-renderer';

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const { colorScheme, setColorScheme, Theme } = useContext(ThemeContext);
  const router = useRouter();

  const [loaded, error] = useFonts({
    Inter_500Medium,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const josonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = josonValue != null ? JSON.parse(josonValue) : null;

        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [data])

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    }
    storeData();
  }, [todos])

  if (!loaded && !error) {
    return null;
  }

  const styles = CreateStyles(Theme, colorScheme);

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

  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }


  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>

      <Pressable
        onPress={() => handlePress(item.id)}
        onLongPress={() => toggleTodo(item.id)}
      >
        <Text style={[styles.todoText, item.completed && styles.completedText]}
        >
          {item.title}
        </Text>
      </Pressable>

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
          maxLength={30}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>

        <Pressable
          onPress={() => setColorScheme(Color === 'light' ? 'dark' : 'light')}
          style={{ marginLeft: 10 }}
        >
          <Octicons name={colorScheme === 'dark' ? "moon" : "sun"}
            size={36} color={Theme.Text}
            selectable={undefined} style={{ width: 36 }} />

        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

function CreateStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      fontFamily: 'Inter_500Medium',
      color: theme.text,
      marginRight: 10,
      fontSize: 16,
      minWidth: 0,
    },
    addButton: {
      backgroundColor: theme.button,
      padding: 10,
      // marginLeft: 10,
      borderRadius: 5,
    },
    addButtonText: {
      color: colorScheme === 'dark' ? 'black' : 'white',
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
      color: theme.text,
      fontSize: 16,
      flex: 1,
      fontFamily: 'Inter_500Medium',
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
  });
