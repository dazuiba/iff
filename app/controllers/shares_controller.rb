class SharesController < ApplicationController  
  def index
    @share = Share.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @share }
    end
  end

  # GET /share/1
  # GET /share/1.xml
  def show
    @share = Share.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @share }
    end
  end

  # GET /share/new
  # GET /share/new.xml
  def new
    @share = Share.new(:url => params[:u], :title=>params[:t])
    @share.user = get_current_user
  end

  # GET /share/1/edit
  def edit
    @share = Share.find(params[:id])
  end

  # POST /share
  # POST /share.xml
  def create
    @share = Share.new(params[:share])

    respond_to do |format|
      if @share.save
        flash[:notice] = 'Share was successfully created.'
        format.html { redirect_to(:action=>"save_ok") }
        format.xml  { render :xml => @share, :status => :created, :location => @share }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @share.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /share/1
  # PUT /share/1.xml
  def update
    @share = Share.find(params[:id])

    respond_to do |format|
      if @share.update_attributes(params[:share])
        flash[:notice] = 'Share was successfully updated.'
        format.html { redirect_to(@share) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @share.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /share/1
  # DELETE /share/1.xml
  def destroy
    @share = Share.find(params[:id])
    @share.destroy

    respond_to do |format|
      format.html { redirect_to(share_url) }
      format.xml  { head :ok }
    end
  end
end
