CREATE FUNCTION get_current_rooms()
   RETURNS INTEGER
   LANGUAGE PLPGSQL
AS $$
BEGIN
   SELECT count(DISTINCT room_code) from test_question;
END;
$$