import axios from 'axios';
import { toast } from 'react-toastify';

export default async function ordersApi(data) {
  try {
    const response = await axios.post('/api/orders', data);

    return toast.success(
      `Status: ${response.status}. Cart contents successfully accepted for processing. Thanks for your order!`,
    );
  } catch (error) {
    return toast.error(`Failed to process order! Error: ${error.message}`);
  }
}
