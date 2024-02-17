import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import * as RN from 'react-native';
import { database } from '../config/fb';
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';


export default function Home() {
    const navigation = useNavigation();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createdAt', 'desc'))

        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().name,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createAt: doc.data().createAt,
                })
                )
            )})
        return unsuscribe;
    }, [])
    
    return (
        <RN.View style={styles.container}>
          <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <RN.Text style={styles.title}>Products</RN.Text>
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </RN.ScrollView>
        </RN.View>
      );
    }