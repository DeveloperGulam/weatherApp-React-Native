import React from "react";
import { Image, Text, View } from "react-native";
import weatherConditions from '../utils/weatherConditions';
import { styles } from '../styles';

const WeekData = ({ item }) => {
  return (
    <View style={styles.weekElement}>
      <View style={[styles.columnWrap, styles.alignLeft]}>
        <Text>{item.day}</Text>
      </View>
      <View style={[styles.columnWrap, styles.alignCenter]}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>{item.maxTemperature}°</Text>
          &nbsp;&nbsp;
          {item.minTemperature}°
        </Text>
      </View>
      <View style={[styles.columnWrap, styles.alignRight]}>
        <Image
          // source={weatherConditions[item.description]?.image}
          source={{uri: item.icon}}
          style={styles.image2}
        />
        <Text>{weatherConditions[item.description]?.title}</Text>
        {/* <Text>{item.description}</Text> */}
      </View>
    </View>
  );
};

export default React.memo(WeekData);
