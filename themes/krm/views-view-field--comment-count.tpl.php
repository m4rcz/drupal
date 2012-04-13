<?php
	
	$comment_count=$row->node_comment_statistics_comment_count;
	switch ($comment_count) {
		case '0':
			unset($comment_count);
			break;
		case '1':
			$comment_count='1 Kommentar';
			break;
		default:
			$comment_count.=' Kommentare';
	}
	if($comment_count) {
		$comment_date=date('d.m.Y',$row->node_comment_statistics_last_comment_timestamp);
		print '<div class="comments">'.$comment_count.' (zuletzt von '.$row->node_comment_statistics_last_comment_name.' am '.$comment_date.')</div><br/>';
	}

	#echo $row->node_new_comments;
	?>