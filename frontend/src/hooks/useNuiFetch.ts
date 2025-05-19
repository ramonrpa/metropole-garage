export const useNuiFetch = () => {
  const send = async <T>(event: string, data?: unknown): Promise<T> => {

    const response = await fetch(`https://${GetParentResourceName()}/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  }

  return send
}
