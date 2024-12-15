import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Card, Divider } from 'react-native-paper';

// Data JSON
const dataWallet = {
  wallet: [
    { kategori: "Makan", nominal: "2000", jenis: "expenses", id: "1" },
    { kategori: "Transport", nominal: "1500", jenis: "expenses", id: "2" },
    { kategori: "Sosial", nominal: "1000", jenis: "expenses", id: "3" },
    { kategori: "Baju", nominal: "2500", jenis: "expenses", id: "4" },
    { kategori: "Lainnya", nominal: "3000", jenis: "expenses", id: "5" },
  ],
};

const AnalyticsScreen = () => {
  const [chartData, setChartData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Filter expenses
    const expenses = dataWallet.wallet.filter((item) => item.jenis === 'expenses');

    // Hitung total expenses
    const total = expenses.reduce((sum, item) => sum + parseInt(item.nominal), 0);
    setTotalExpenses(total);

    // Format data untuk PieChart
    const formattedData = expenses.map((item, index) => ({
      name: item.kategori,
      amount: parseInt(item.nominal),
      color: getPieColors(index),
      legendFontColor: "#333",
      legendFontSize: 12,
    }));

    setChartData(formattedData);
  }, []);

  // Warna untuk PieChart
  const pieColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const getPieColors = (index) => pieColors[index % pieColors.length];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Expense Analytics</Text>

      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[0, 0]}
        absolute
      />

      <Text style={styles.totalText}>Total Expenses: <Text style={styles.totalAmount}>Rp {totalExpenses}</Text></Text>

      <Divider style={styles.divider} />

      <FlatList
        data={chartData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardAmount}>Rp {item.amount}</Text>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginVertical: 10 },
  totalText: { fontSize: 18, textAlign: 'center', marginVertical: 10, color: '#555' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#FF6384' },
  divider: { marginVertical: 10 },
  card: { marginVertical: 5, backgroundColor: '#ffffff', borderRadius: 8, elevation: 3 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  cardTitle: { fontSize: 16, color: '#333' },
  cardAmount: { fontSize: 16, fontWeight: 'bold', color: '#FF6384' },
});

export default AnalyticsScreen;