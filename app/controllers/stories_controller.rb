class StoriesController < ApplicationController
  before_action :find_user
  before_action :find_story, except: [:index, :new, :create]

  def index
    @stories = Story.all
  end

  def new
    @story = Story.new
  end

  def create
    @story = Story.new(story_params.merge(user_id: @user.id))
    if @story.save
      redirect_to stories_path
    else
      flash[:danger] = "Your story did not save."
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @story.update(story_params)
      redirect_to stories_path(@story)
    else
      render :edit
    end
  end

  def delete
    @story.destroy
  end

  private

  def find_user
    @user = User.find(params[:user_id])
  end

  def find_story
    @story =  Story.find_by(params[:id])
  end

  def story_params
    params.require(:story).permit(:title,:content,:published)
  end

end
