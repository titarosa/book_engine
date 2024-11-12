import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'; // Query to get user data
import { REMOVE_BOOK } from '../utils/mutations'; // Mutation to remove book
import { removeBookId } from '../utils/localStorage';
import Auth from '../utils/auth';

const SavedBooks = () => {
  // Apollo query to get the user data
  const { loading, data } = useQuery(QUERY_ME);

  // Apollo mutation to remove a book
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Access user data (with optional chaining for safe data access)
  const userData = data?.me || {};

  // Handle book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      // After deletion, remove bookId from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Display a loading message if the data is still being fetched
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {/* Loop through savedBooks array and display each book */}
          {userData.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {/* Render book image */}
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    {/* Book title, authors, description */}
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {/* Button to delete the book */}
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

