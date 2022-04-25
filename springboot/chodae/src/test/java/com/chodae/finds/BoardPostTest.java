package com.chodae.finds;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.domain.Board;
import com.chodae.domain.Category;
import com.chodae.domain.Post;
import com.chodae.domain.PostContent;
import com.chodae.domain.Reply;
import com.chodae.domain.User;
import com.chodae.group.BoardGroup;
import com.chodae.repository.BoardRepo;
import com.chodae.repository.CategoryRepo;
import com.chodae.repository.PostRepo;
import com.chodae.repository.ReplyRepo;
import com.chodae.repository.UserRepo;

import lombok.extern.java.Log;




//@Commit
@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BoardPostTest {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private BoardRepo boardRepo;
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private ReplyRepo replyRepo;
	
	@Autowired
	private CategoryRepo cateRepo;
	
	@Transactional
	@Test
	public void selectPostByBoard() {
		Board board = new Board();
		board.setBoardNo(1);
		List<Post> list = postRepo.findPostByBoard(board);
		list.forEach(post -> log.info(""+post));
	}
	@Transactional
	@Test
	public void selectPostByBoardNo() {
		
		List<Post> list = postRepo.findPostByBoard(1);
		list.forEach(post -> log.info(""+post));
	}

	@Transactional
	@Test
	public void selectPostByBoard3() {
		
		List<Post> list = postRepo.findPostByBoardNo(1);
		list.forEach(post -> log.info(""+post.getPostNo()+post.getReplies()));
	}
	@Transactional
	@Test
	public void selectPostCount4() {
		
		List<Object[]> list = postRepo.getPostCountByWriter(200L);
		list.forEach(post -> System.out.println(Arrays.toString(post)));
	}
	
	
	@Transactional
	@Test
	public void testEnum() {
		log.info("열거형테스트를 시작합니다.");
		
		
		BoardGroup[] board = BoardGroup.values();
		log.info(Arrays.toString(board));
		log.info(""+BoardGroup.getBoardGroupByNo(1).name());
	
	}
	
	
	@Transactional
	@Test
	public void insertBoardAll() {   //1. 게시판 그룹 세팅

		
		List<Board> list = new ArrayList<Board>();
		BoardGroup[] arr = BoardGroup.values();
		
		for (BoardGroup bg : arr) {
			System.out.printf("%s=%d,", bg.name(), bg.getValue());
			
			Board board = new Board();
			board.setBoardNo(bg.getValue());
			board.setBoardName(bg.name());
			board.setBoardWriter(200L);
			board.setBoardCategory("게시판의 카테고리");
			board.setBoardDate(LocalDateTime.now());
			board.setBoardOrder("게시판순서?");
			board.setBoardStatus("T");
			
			list.add(board);
			
		}
		
		
		List<Board> list2 = boardRepo.saveAll(list);
		System.out.println("통과됨");
		for (Board b : list2) {
			System.out.println(b.toString());
			
		}

	}
	
	
	
	Long id = 200L;
	String title = "제목";
	Integer level = 5;
	Integer postLevel = 5;
	String postNotice = "F";
	String postComment="T";
	String postDisplay="T";
	
	//2. 게시글 데이터 세팅
	@Transactional
	@Test
	public void insertPost() {

		//모든 게시판 별로 게시글 50개씩 데이터 입력 
		BoardGroup[] arr = BoardGroup.values();
		
		for (BoardGroup bg : arr) {
			
			if(bg.getValue() == 7 ) {
				continue; //리뷰 게시판은 생략
			}
			
			System.out.printf("%s=%d,", bg.name(), bg.getValue());
			
			Board board = new Board();
			board.setBoardNo(bg.getValue());
			
			IntStream.range(1, 50).forEach(i -> {
				Post post = new Post();
				
				post.setBoard(board);
				
				PostContent postContent = new PostContent();
				postContent.setContent("게시글 내용"+i);
				post.setPostContent(postContent);
				
				post.setPostTitle(title+i);
				post.setId(51L);
				post.setPostViews(0);
				post.setLevel(5);
				post.setPostLevel(5);
				post.setReplyCount(0);
				post.setPostLike(0);
				post.setPostRegdate(LocalDateTime.now());
				post.setPostModdate(LocalDateTime.now());
				post.setPostNotice("F");
				post.setPostDisplay("T");
				post.setPostComment("T");
				
				postRepo.save(post);
				
			});
			
			
			
		}
		
		
	}
	//2-1. 리뷰게시판 게시글 세팅
	@Transactional
	@Test
	public void insertReviewPost() {
		
		//Post 데이터는 반드시 Board 객체에 대한 참조가 필요하다.(외래키로 게시판 번호 필요) 
		//Board 객체를 잠시 생성해서  외래키로 사용되는 board_no 속성만 설정해주는게 더 효율적.  
		
		
		BoardGroup[] arr = BoardGroup.values();
		
		for (BoardGroup bg : arr) {
			
			//리뷰 게시판 설정
			if(bg.getValue() != 7 ) {
				continue;
			}
			
			System.out.printf("%s=%d,", bg.name(), bg.getValue());
			
			Board board = new Board();
			board.setBoardNo(bg.getValue());
			
			IntStream.range(0, 11).forEach(i -> {
				Post post = new Post();
				
				post.setBoard(board);
				
				PostContent postContent = new PostContent();
				postContent.setContent("리뷰게시판카드내용"+i);
				post.setPostContent(postContent);
				
				
				post.setPostTitle("리뷰게시판카드"+i);
				post.setId(201L);//관리자 아이디가 생성 
				post.setPostViews(0);
				post.setLevel(5);
				post.setPostLevel(5);
				post.setReplyCount(0);
				post.setPostLike(0);
				post.setPostRegdate(LocalDateTime.now());
				post.setPostModdate(LocalDateTime.now());
				post.setPostNotice("F");
				post.setPostDisplay("T");
				post.setPostComment("T");
				
				Post postDB = postRepo.save(post);
				
				Category category = new Category();
				category.setCategoryKind("index");
				category.setCategoryName(String.valueOf(i));
				category.setPost(postDB);
				cateRepo.save(category);
				
			});
			
			
			
		}
		
		
	}
	
	//리뷰게시판 조회 (카테고리의 인덱스 넘버로 찾기)

	@Test
	@Transactional
	public void selectReviewPosts() {
		
		Optional<Post> result = postRepo.findCateKindAndName("index","0");
		
		Post postInfo = result.get();
		
		log.info(""+postInfo);
		
		
		
	}
	
	//게시글 조회 
	@Test
	@Transactional
	public void selectPosts() {
		
		List<Post> list = postRepo.findAll();
		list.forEach(post -> {
			
			System.out.println(post);
			log.info("글번호:"+post.getPostNo()+"내용번호"+post.getPostContent().getContentNo()+"댓글갯수:"+post.getReplies().size()+":카테고리개수="+post.getCategory().size()+","+post.getPostTitle()+","+post.getReplyCount()+post.getReplies());
		});
	}
	
	@Test
	@Transactional
	public void insertReviewReply() {
		
		Reply reply = new Reply();//댓글 엔티티 생성

		reply.setBoardNo(BoardGroup.valueOf("review").getValue());//게시판 이름을 전달받아 enum으로 게시판 번호로 변환
	
		Post post =  postRepo.findById(393L).get();
		post.setReplyCount(post.getReplyCount()+1); //댓글수 1 증가 
		reply.setPost(post);//게시글 번호, 댓글수 1 증가 반영
		
		//닉네임 => id로 변환하여 설정
		User user = null;
		
		Optional<User> result = userRepo.findUserByNickname("닉네임1");
		if(result.isPresent()) {
			user = result.get();			
		}
		reply.setId(user.getId());//작성 회원번호  (중복체크한 닉네임을  id로 바꿔서 등록) 
		
		
		reply.setReplyContent("댓글테스트내용");//댓글 내용
		reply.setReplyRegdate(LocalDateTime.now());//작성일자
		reply.setReplyModdate(LocalDateTime.now());//수정일자
		reply.setReplyLike(0);//추천수 (기본값 0) 
		reply.setLevel(3);//회원등급
		
		reply.setUpperReply(0);//상위댓글번호(임의로 기본값 0으로 설정. 아직 사용하지 않음.) 
		
		replyRepo.save(reply);
		
	}
	
	@Test
	@Transactional
	public void deleteReviewReply() {
		Optional<Reply> result =  replyRepo.findById(1L);
		
		if(result.isPresent()) {
			Reply reply = result.get();
			
			Post post = reply.getPost();
			post.setReplyCount(post.getReplyCount()-1);
			postRepo.saveAndFlush(post);
			
			
			replyRepo.deleteById(1L);
			
			
		}
	}
	
	@Test
	@Transactional //지연로딩
	public void insertReply() {
		//댓글만 저장한다면?  => 된다. 게시글에서도 댓글리스트에 반영되어있음.
		
		//1. 게시글의 번호만 필요, 해당 게시글 번호를 직접 설정해서 댓글 저장.
//		Post post = new Post();
//		post.setPostNo(1L);
//		
//		Reply reply = new Reply();
//		reply.setPost(post);
//		reply.setBoardNo(1);
//		reply.setReplyContent("댓글내용");
//		reply.setReplyRegdate(LocalDateTime.now());
//		reply.setReplyModdate( LocalDateTime.now()  );
//		reply.setId(51L);
//		reply.setReplyLike(0);
//		reply.setLevel(5);
//		reply.setUpperReply(0);
//		replyRepo.save(reply);
		
		
		//2. 1번 방법으로는 댓글수 증가를 할 수가 없음. 달린 댓글수를 증가시키기 위해서 진짜 게시글 객체를  찾아서 불러옴.
		//2번 방법이 간편한 것 같음.
		
//		Optional<Post> post =  postRepo.findById(1L);
//		post.ifPresent(postInfo -> {
//			
//			
//			
//			
//			Reply reply = new Reply();
//			reply.setPost(postInfo);
//			reply.setBoardNo(1);
//			reply.setReplyContent("2번방법");
//			reply.setReplyRegdate(LocalDateTime.now());
//			reply.setReplyModdate( LocalDateTime.now()  );
//			reply.setId(51L);
//			reply.setReplyLike(0);
//			reply.setLevel(5);
//			reply.setUpperReply(0);
//			replyRepo.save(reply);
//			System.out.println("@@@@@@@@ "+postInfo);
//			postInfo.setReplyCount(postInfo.getReplyCount()+1);
//		});
		
		//3. 양방향 관계설정이니까 게시판을 불러와서 게시판 댓글리스트 자체에 댓글을 add 한 후에 게시판을 저장하는 방식도 된다. 
		
		Optional<Post> post =  postRepo.findById(100L);
		post.ifPresent(postInfo -> {
			
			List<Reply> list = postInfo.getReplies();
			
			
			
			Reply reply = new Reply();
			reply.setPost(postInfo);
			reply.setBoardNo(BoardGroup.faq.getValue());
			reply.setReplyContent("댓글내용이에요");
			reply.setReplyRegdate(LocalDateTime.now());
			reply.setReplyModdate( LocalDateTime.now()  );
			reply.setId(51L);
			reply.setReplyLike(0);
			reply.setLevel(5);
			reply.setUpperReply(0);
//			replyRepo.save(reply);
			
			//댓글리스트에 add 후에 리스트와 함꼐 게시판 자체를 저장.
			list.add(reply);
			postInfo.setReplies(list);
			postRepo.save(postInfo);
			
			
			System.out.println("@@@@@@@@ "+postInfo);
			postInfo.setReplyCount(postInfo.getReplyCount()+1); 
		});
		
		
	}
	
	

}
