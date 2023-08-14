import { StyleSheet } from 'react-native';

export const theme = {
  primaryColor: '#3498db',
  secondaryColor: '#f39c12',
  white: '#ffffff',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    height: 60,
    marginTop: 38,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchSection: {
    flex: 1,
    position: 'absolute',
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 28,
  },
  inputIconWrap: { 
    backgroundColor: "#eee", 
    padding: 10, 
    borderRadius: 20, 
    margin: 3, 
    marginRight: 4 
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333',
    backgroundColor: '#ccc', 
    paddingHorizontal: 20,
    borderRadius: 28,
    paddingHorizontal: 20,
  },
  topMain: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  address: {
    fontSize: 18,
    fontWeight: '700'
  },
  date: {
    color: '#555',
  },
  loader: { 
    width: 100, 
    height: 100,
  },
  image: { 
    width: 100, 
    height: 100, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  temperature: {
    fontSize: 31,
  },
  description: {
    fontSize: 16,
    color: '#777',
  },
  bottomMain: {
    flex: 1,
    maxWidth: '100%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  weekElement: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent:'space-between',
    flex: 1,
  },
  columnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  image2: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
});
