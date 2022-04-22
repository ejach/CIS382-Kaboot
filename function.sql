CREATE OR REPLACE FUNCTION get_room_members(target_code integer)
    RETURNS SETOF text AS $$
        SELECT count(user_id) AS users FROM user_room WHERE room_code=target_code GROUP BY room_code;
$$ LANGUAGE SQL STABLE;