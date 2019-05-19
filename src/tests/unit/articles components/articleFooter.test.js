import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { shallow, mount } from '../../enzyme';
import ConnectedArticleFooter, { ArticleFooter } from '../../../containers/articles/ArticleFooter';

describe("Footer", () => {
    it("should render the Footer component", () => {
        const div = document.createElement('div');
        const testStore = configureMockStore([thunk]);
        let store = testStore({
            articles: [],
            error: {},
            message: {},
            editMessage: {},
            deleteMessage: {},
            bookmarkMessage: {},
        });
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedArticleFooter />
            </Provider>
        , 
        div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should update is_bookmarked state", async () => {
        const testStore = configureMockStore([thunk]);
        let store = testStore({
            articles: [],
            error: {},
            message: {},
            editMessage: {},
            deleteMessage: {},
            bookmarkMessage: {},
        });
        const wrapper = shallow(<ArticleFooter
            getBookmarks = {jest.fn()}
            bookmarkArticle = {jest.fn()}
        />)
        
        const initialIsBookmarked = wrapper.instance().state.isBookmarked
        wrapper.instance().handleClick()
        wrapper.update()
        const currentIsBookmarked = wrapper.instance().state.isBookmarked

        expect(initialIsBookmarked).toBe(false)
        expect(currentIsBookmarked).toBe(true)
    });

    it("should revert is_bookmarked state", async () => {
        const testStore = configureMockStore([thunk]);
        let store = testStore({
            articles: [],
            error: {},
            message: {},
            editMessage: {},
            deleteMessage: {},
            bookmarkMessage: {},
        });
        const wrapper = shallow(<ArticleFooter
            getBookmarks = {jest.fn()}
            bookmarkArticle = {jest.fn()}
        />)
        
        wrapper.setProps({
            article: {
                "id": 31,
                "article_id": 294,
                "title": "Wantana mera"
            },
            bookmarks: [{
                "id": 31,
                "article_id": 31,
                "title": "Wantana mera"
            }],
            find: jest.fn().mockReturnValue({
                "id": 31,
                "article_id": 294,
                "title": "Wantana mera"
            })
        })
        wrapper.update()

        expect(wrapper.instance().state.isBookmarked).toBe(true)
    });
});
