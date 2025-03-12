const isSuccessful = (r: Response) => r.status >= 200 && r.status <= 399;

export const handleFetchRequest = async <T>(
  fetchRequest: Promise<Response>
): Promise<T> => {
  const response = await fetchRequest;
  let json = null;
  let text = null;

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('text/plain') > -1) {
    text = await response.text();
  } else if (contentType && contentType.indexOf('application/json') > -1) {
    json = await response.json();
  }

  const isSuccess = isSuccessful(response);

  if (!isSuccess) {
    if (text) {
      throw new Error(text);
    }

    if (json) {
      if ('message' in json) {
        throw new Error(json.message);
      } else if ('error' in json) {
        throw new Error(json.error);
      }
    }

    throw new Error(
      `Response Code: ${response.status} - ${response.statusText}.`
    );
  }

  return text || json;
};
