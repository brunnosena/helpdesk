import React, { useState } from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';

export function OrderForm() {
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      Alert.alert('Chamado', 'Chamado criado com sucesso!');
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    })
    .finally(() => setIsLoading(false));
  }

  return (
    <Form>
      <Title>Novo chamado</Title>
      <Input placeholder="Número do Patrimônio" onChangeText={setPatrimony} />
      <TextArea placeholder="Descrição" onChangeText={setDescription} />

      <Button title="Enviar chamado" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}