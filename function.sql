CREATE OR REPLACE FUNCTION get_current_rooms()
    RETURNS SETOF text AS $$
        SELECT count(DISTINCT room_code) from test_question;
$$ LANGUAGE SQL STABLE;