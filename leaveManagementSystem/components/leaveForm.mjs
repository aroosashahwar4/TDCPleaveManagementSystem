import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const LeaveForm = ({ onSubmit = () => {} }) => {
  const [form, setForm] = useState({
    employeeName: '',
    department: '',
    designation: '',
    leaveType: '',
    reason: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const {
      employeeName,
      department,
      designation,
      leaveType,
      reason,
      startDate,
      endDate,
    } = form;

    if (!employeeName || !department || !designation || !leaveType || !reason) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const payload = {
      EmployeeName: form.employeeName,
      Department: form.department,
      Designation: form.designation,
      LeaveType: form.leaveType,
      StartDate: form.startDate.toISOString(),
      EndDate: form.endDate.toISOString(),
      Reason: form.reason,
    };

    try {
      console.log('Sending payload:', payload);

      const res = await axios.post('http://192.168.5.141:3000/api/leaves', payload);


      console.log('Saved:', res.data);
      Alert.alert('Success', 'Leave submitted successfully');
      onSubmit(); // Optional callback after submit
    } catch (error) {
      console.error('Error saving leave:', error.message);
      Alert.alert('Error', 'Failed to save leave');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leave Application</Text>

      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={form.employeeName}
        onChangeText={(text) => handleChange('employeeName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Department"
        value={form.department}
        onChangeText={(text) => handleChange('department', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Designation"
        value={form.designation}
        onChangeText={(text) => handleChange('designation', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Leave Type"
        value={form.leaveType}
        onChangeText={(text) => handleChange('leaveType', text)}
      />

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.dateText}>
          Start Date: {form.startDate.toDateString()}
        </Text>
      </TouchableOpacity>
      
      {showStartPicker && (
        <DateTimePicker
          value={form.startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(Platform.OS === 'ios');
            if (selectedDate) handleChange('startDate', selectedDate);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.dateText}>
          End Date: {form.endDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={form.endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(Platform.OS === 'ios');
            if (selectedDate) handleChange('endDate', selectedDate);
          }}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Reason"
        value={form.reason}
        onChangeText={(text) => handleChange('reason', text)}
        multiline
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeaveForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  dateText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});
